from django.db import models

#
# class Stats(models.Model):
#     pass


class StatsUploadEvent(models.Model):
    STATUSES = (
        ('in_progress', 'выполняется'),
        ('success', 'выполнена'),
        ('failed', 'ошибка'),
    )
    uploaded_at = models.DateTimeField(
        auto_created=True,
        verbose_name='время загрузки'
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
