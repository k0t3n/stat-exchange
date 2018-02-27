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

    def run(self, *args, **kwargs):
        task_id = kwargs.get('task_id')
        csv_file_upload = kwargs.get('file')
        upload_event = StatsUploadEvent.objects.get(parse_task_id=task_id)

        with open(csv_file_upload, 'r') as file_obj:
            file_data = csv.DictReader(file_obj, delimiter=',')

            created = None
            items_created = 0
            unique_currency_pairs = []

            for item in file_data:
                currency_pair = CurrencyPair.objects.get_or_create(
                    first_currency=item['Market'].split('/')[0],
                    last_currency=item['Market'].split('/')[1],
                )[0]

                try:
                    StatsRecord.objects.select_related('currency_pair'). \
                        get(**{'record_type': item['Type'].lower(),
                               'currency_pair': currency_pair})
                except StatsRecord.DoesNotExist:
                    created = StatsRecord.objects.create(
                        record_type=item['Type'].lower(),
                        currency_pair=currency_pair,
                        datetime=datetime.strptime(item['Date'], '%Y-%m-%d %H:%M:%S'),
                        price=float(item['Price']),
                        upload_event=upload_event,
                        amount=float(item['Amount']),
                        total=float(item['Total']),
                        order=int(item['Order Number']),
                        base_total_less_fee=float(item['Base Total Less Fee']),
                        quote_total_less_fee=float(item['Quote Total Less Fee'])
                    )

                if created:
                    items_created += 1

                unique_currency_pairs.append('{}/{}'.format(currency_pair.first_currency, currency_pair.last_currency))

        result = {
            'uploaded_records': items_created,
            'unique_currency_pairs': list(set(unique_currency_pairs)),
        }

        return result

    def on_success(self, retval, task_id, *args, **kwargs):
        print(task_id)
        task_celery = AsyncResult(task_id)
        uploaded_records = task_celery.result['uploaded_records']

        stats_task = StatsUploadEvent.objects.get(parse_task_id=task_id)
        stats_task.status = 'success'
        stats_task.uploaded_records = int(uploaded_records)
        stats_task.save()

        return

    def on_failure(self, exc, task_id, args, kwargs, einfo):
        print('_________________________________')
        print(task_id)
        stats_task = StatsUploadEvent.objects.get(parse_task_id=task_id)
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

    def run(self, result, *args, **kwargs):

        unique_currency_pairs = result['unique_currency_pairs']
        task_id = kwargs.get('task_id')
        user = StatsUploadEvent.objects.get(
            update_profit_task_id=task_id,
        ).uploaded_by

        for pair in unique_currency_pairs:

            currency_pair = CurrencyPair.objects.get(
                first_currency=pair.split('/')[0],
                last_currency=pair.split('/')[1],
            )

            stats = StatsRecord.objects.filter(
                currency_pair=currency_pair,
                upload_event__uploaded_by=user,
            ).order_by('datetime')

            first_stat = True  # первый раз ли проходит цикл
            is_previous_sell = False  # была ли предыдущая запись продажей
            previous_date = None  # предыдущая дата

            trade_profit = 0  # профит текущей сделки

            stats_records = []

            for stat in stats:
                stats_records.append(stat)

                if first_stat:  # если только начало
                    if stat.record_type == 'buy':
                        trade_profit -= stat.total
                        first_stat = False

                    elif stat.record_type == 'sell':  # первая запись не может быть продажей
                        print('Первая запись на продажу - пропускаю')

                else:  # если не начало
                    if is_previous_sell:  # если предыдущее было продажей
                        if stat.record_type == 'buy':  # и если текущее покупкой
                            self._create_or_update_trade_profit(currency_pair, user, previous_date, trade_profit,
                                                                stats_records)  # создаем или обновляем профит

                            stats_records[:] = []  # обнуляем id записей этой сделки
                            trade_profit = 0 - stat.total  # обнуляем и записываем профит новой операции
                            is_previous_sell = False  # возвращаем в исходное значение

                        elif stat.record_type == 'sell':  # если у нас ещё одна продажа
                            trade_profit += stat.total

                    else:  # если предыдущая была покупкой
                        if stat.record_type == 'buy':  # и если текущее покупкой
                            trade_profit -= stat.total  # то записываем профит общей сделки

                        elif stat.record_type == 'sell':  # если текущая продажей
                            trade_profit += stat.total  # то записываем профит общей сделки
                            previous_date = stat.datetime.date()  # и записываем последнюю дату
                            is_previous_sell = True  # ставим, что предыдущее было продажей

        return

    def on_success(self, retval, task_id, *args, **kwargs):
        return

    def on_failure(self, exc, task_id, args, kwargs, einfo):
        return

    def _create_or_update_trade_profit(self, currency_pair, user, date, profit, stats_records):
        trade_profit, created = TradeProfit.objects.get_or_create(
            date=date,
            owner=user,
            currency_pair=currency_pair
        )

        trade_profit.profit = profit
        trade_profit.stats_records.add(*stats_records)
        trade_profit.save()

        return
