# Generated by Django 2.0.2 on 2018-02-16 16:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('stats', '0003_auto_20180216_1906'),
    ]

    operations = [
        migrations.RenameField(
            model_name='stats',
            old_name='currency_pairs',
            new_name='currency_pair',
        ),
    ]