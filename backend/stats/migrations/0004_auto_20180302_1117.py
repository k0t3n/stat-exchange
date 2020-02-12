# Generated by Django 2.0.2 on 2018-03-02 11:17

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ('stats', '0003_auto_20180226_1214'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='statsuploadevent',
            name='status',
        ),
        migrations.AddField(
            model_name='statsuploadevent',
            name='parse_status',
            field=models.CharField(
                choices=[('in_progress', 'выполняется'), ('error', 'ошибка'), ('success', 'успешно')],
                default='in_progress', max_length=15, verbose_name='статус'),
        ),
        migrations.AddField(
            model_name='statsuploadevent',
            name='update_profit_status',
            field=models.CharField(
                choices=[('in_progress', 'выполняется'), ('error', 'ошибка'), ('success', 'успешно')],
                default='in_progress', max_length=15, verbose_name='статус'),
        ),
    ]