from django.contrib.auth.models import User
from django.db import models


class CurrencyPair(models.Model):
    first_currency = models.CharField(
        max_length=5,
        verbose_name='первая валюта'
    )

    last_currency = models.CharField(
        max_length=5,
        verbose_name='вторая валюта'
    )

    class Meta:
        verbose_name = 'пара валют'
        verbose_name_plural = 'пары валют'

    def __str__(self):
        return '{}/{}'.format(self.first_currency, self.last_currency)


class StatsRecord(models.Model):
    RECORD_TYPES = (
        ('buy', 'покупка'),
        ('sell', 'продажа'),
    )

    record_type = models.CharField(
        blank=True, null=True,
        max_length=5,
        choices=RECORD_TYPES,
        verbose_name='тип'
    )

    currency_pair = models.ForeignKey(
        CurrencyPair,
        on_delete=models.CASCADE,
        related_name='stats'
    )

    upload_event = models.ForeignKey(
        'StatsUploadEvent',
        on_delete=models.CASCADE
    )

    datetime = models.DateTimeField(
        verbose_name='дата/время'
    )

    price = models.DecimalField(
        max_digits=17, decimal_places=8,  # <1 milliard
        verbose_name='цена 1 монеты при сделке'
    )

    amount = models.DecimalField(
        max_digits=17, decimal_places=8,  # <1 milliard
        verbose_name='количество продаваемой/покупаемой валюты'
    )

    total = models.DecimalField(
        max_digits=17, decimal_places=8,  # <1 milliard
        verbose_name='сумма продажи/покупки второй валюты'
    )

    fee = models.DecimalField(
        max_digits=5, decimal_places=2,  # <100
        verbose_name='процент комиссии'
    )

    order = models.BigIntegerField(
        verbose_name='номер заказа'
    )

    base_total_less_fee = models.DecimalField(
        max_digits=17, decimal_places=8,  # <1 milliard
        verbose_name='сумма транзакции в 1 валюте с учетом комиссии'
    )

    quote_total_less_fee = models.DecimalField(
        max_digits=17, decimal_places=8,  # <1 milliard
        verbose_name='сумма транзакции во 2 валюте с учетом комиссии'
    )

    class Meta:
        verbose_name = 'история транзакций'
        verbose_name_plural = 'истории транзакций'

    def __str__(self):
        return '{} {}/{}'.format(self.get_record_type_display().capitalize(), self.currency_pair.first_currency,
                                 self.currency_pair.last_currency)


class StatsUploadEvent(models.Model):
    STATUSES = (
        ('in_progress', 'выполняется'),
        ('success', 'выполнена'),
        ('failed', 'ошибка'),
    )

    EXCHANGES = (
        ('bittrex', 'BITTREX'),
        ('binance', 'BINANCE'),
        ('poloniex', 'POLONIEX'),
    )

    exchange = models.CharField(
        blank=True, null=True,
        max_length=10,
        choices=EXCHANGES,
        verbose_name='биржа'
    )

    parse_task_id = models.CharField(
        max_length=36,
        verbose_name='ID задачи парсинга',
    )

    update_profit_task_id = models.CharField(
        max_length=36,
        verbose_name='ID задачи обновления профита'
    )

    uploaded_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='время загрузки'
    )

    uploaded_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name='загружено пользователем'
    )

    uploaded_records = models.PositiveIntegerField(
        default=0,
        verbose_name='загружено записей'
    )

    status = models.CharField(
        max_length=15,
        choices=STATUSES,
        default='in_progress',
        verbose_name='статус'
    )

    file = models.FilePathField(
        recursive=True,
        allow_folders=True, allow_files=True,
        default=None,
        verbose_name='путь до файла',
    )

    class Meta:
        verbose_name = 'загрузка статистики'
        verbose_name_plural = 'загрузка статистики'

    def __str__(self):
        return 'Status: {}, uploaded: {}'.format(self.status, self.uploaded_records)


class TradeProfit(models.Model):
    stats_records = models.ManyToManyField(
        StatsRecord,
        verbose_name='статистические записи',
    )

    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name='владелец'
    )

    currency_pair = models.ForeignKey(
        CurrencyPair,
        on_delete=models.CASCADE,
        related_name='trade_profit'
    )

    profit = models.DecimalField(
        max_digits=17, decimal_places=8,  # <1 milliard
        default=0,
        verbose_name='профит',
    )

    date = models.DateField(
        verbose_name='дата'
    )

    class Meta:
        verbose_name = 'профит за день'
        verbose_name_plural = 'профиты за день'
        ordering = ['date']

    def __str__(self):
        return 'Пара {}, профит {}, количество записей {}, дата {}'.format(self.currency_pair, self.profit,
                                                                           self.stats_records.count(), self.date)
