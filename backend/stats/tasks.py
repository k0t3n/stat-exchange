import csv
from datetime import datetime

from celery.result import AsyncResult
from celery.task import Task

from .models import StatsUploadEvent, StatsRecord, CurrencyPair, TradeProfit


class ParsePoloniexStatsTask(Task):
    """
    Парсим файл с историей биржи Polonix
    """

    ignore_result = False
    stock_exchange = 'poloniex'

    def run(self, path_to_file, *args, **kwargs):
        with open(path_to_file, 'r') as file_obj:
            file_data = csv.DictReader(file_obj, delimiter=',')

            data = []

            for item in file_data:
                data.append(
                    StatsRecord(
                        record_type=item['Type'].lower(),
                        exchange=self.stock_exchange,
                        currency_pair=CurrencyPair.objects.get_or_create(
                            first_currency=item['Market'].split('/')[0],
                            last_currency=item['Market'].split('/')[1],
                        )[0],  # because get_or_create() returns tuple
                        datetime=datetime.strptime(item['Date'], "%Y-%m-%d %H:%M:%S").date(),
                        price=float(item['Price']),
                        amount=float(item['Amount']),
                        total=float(item['Total']),
                        fee=float(item['Fee'][:-1]),  # remove %
                        order=int(item['Order Number']),
                        base_total_less_fee=float(item['Base Total Less Fee']),
                        quote_total_less_fee=float(item['Quote Total Less Fee'])
                    )
                )

            stats = StatsRecord.objects.bulk_create(data)
            print(stats)

        result = {
            'uploaded_records': len(data)
        }

        return result

    def on_success(self, retval, task_id, *args, **kwargs):
        task_celery = AsyncResult(task_id)
        result = task_celery.result

        stats_task = StatsUploadEvent.objects.get(task_id=task_id)
        stats_task.status = 'success'
        stats_task.uploaded_records = int(result['uploaded_records'])
        stats_task.save()

        return

    def on_failure(self, exc, task_id, args, kwargs, einfo):
        stats_task = StatsUploadEvent.objects.get(task_id=task_id)
        stats_task.status = 'failed'
        stats_task.save()

        return


# TODO
class ParseBittrexStatsTask(Task):

    def run(self, *args, **kwargs):
        return

    def on_success(self, retval, task_id, *args, **kwargs):
        return

    def on_failure(self, exc, task_id, args, kwargs, einfo):
        return


# TODO
class ParseBinanceStatsTask(Task):

    def run(self, *args, **kwargs):
        return

    def on_success(self, retval, task_id, *args, **kwargs):
        return

    def on_failure(self, exc, task_id, args, kwargs, einfo):
        return


class TradeProfitRecalculationTask(Task):

    def run(self, first_currency, last_currency, *args, **kwargs):

        stats = StatsRecord.objects.filter(
            currency_pair__first_currency=first_currency,
            currency_pair__last_currency=last_currency,
        ).order_by('datetime')

        first_stat = True  # первый раз ли проходит цикл
        is_previous_sell = False  # была ли предыдущая запись продажей
        previous_date = None  # предыдущая дата

        trade_profit = 0  # профит текущей сделки

        trade_stats = []

        for stat in stats:
            trade_stats.append(stat)

            if first_stat:  # если только начало
                if stat.type == 'buy':
                    trade_profit -= stat.total
                    first_stat = False

                elif stat.type == 'sell':  # первая запись не может быть продажей
                    print('Первая запись на продажу - пропускаю')

            else:  # если не начало

                if is_previous_sell:  # если предыдущее было продажей
                    if stat.type == 'buy':  # и если текущее покупкой

                        self._create_or_update_trade_profit(previous_date, trade_profit, trade_stats)

                        print('__________________________')
                        trade_stats = []
                        trade_profit = 0 - stat.total  # обнуляем и записываем профит новой операции
                        is_previous_sell = False  # возвращаем в исходное значение

                    elif stat.type == 'sell':  # если у нас ещё одна продажа
                        trade_profit += stat.total

                else:  # если предыдущая была покупкой
                    if stat.type == 'buy':  # и если текущее покупкой
                        trade_profit -= stat.total  # то записываем профит общей сделки

                    elif stat.type == 'sell':  # если текущая продажей
                        trade_profit += stat.total  # то записываем профит общей сделки
                        previous_date = stat.datetime.date()  # и записываем последнюю дату
                        is_previous_sell = True  # ставим, что предыдущее было продажей

            print(stat.type, stat.currency_pair, stat.total, stat.datetime)
            print(trade_profit)

        return

    def on_success(self, retval, task_id, *args, **kwargs):
        return

    def on_failure(self, exc, task_id, args, kwargs, einfo):
        return

    def _create_or_update_trade_profit(self, date, profit, stats_records):
        trade_profit, created = TradeProfit.objects.get_or_create(date=date)
        if not created:
            trade_profit.profit += profit

            for stats_record in stats_records:
                trade_profit.stats_records.add(stats_record)

            trade_profit.save()
