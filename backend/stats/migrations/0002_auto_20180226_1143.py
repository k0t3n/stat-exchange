# Generated by Django 2.0.2 on 2018-02-26 11:43

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ('stats', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='statsrecord',
            name='currency_pair',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='stats',
                                    to='stats.CurrencyPair'),
        ),
    ]
