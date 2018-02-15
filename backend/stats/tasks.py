import os
import csv

from celery import Task
from core.celery import app
from celery.result import AsyncResult

from core.settings import BASE_DIR, UPLOAD_DIR
from .models import StatsUploadEvent, Stats, CurrencyPair


class ParseStatsTask(Task):

    def on_success(self, retval, task_id, *args, **kwargs):
        task_celery = AsyncResult(task_id)
        result = task_celery.result
        return

    def on_failure(self, exc, task_id, args, kwargs, einfo):
        task_celery = AsyncResult(task_id)
        return


@app.task(base=ParseStatsTask)
def start_parse(filename):
    with open(os.path.join(BASE_DIR, UPLOAD_DIR, filename), 'r') as file_obj:
        file_data = csv.DictReader(file_obj, delimiter=',')

        data = []

        for item in file_data:
            data.append(
                Stats(
                    type=item['Type'].lower(),
                    currency=CurrencyPair.objects.get_or_create(
                        first_currency=item['Market'].split('/')[0],
                        last_currency=item['Market'].split('/')[1],
                    )[0],
                    datetime=item['Date'],
                    price=float(item['Price']),
                    amount=float(item['Amount']),
                    total=float(item['Total']),
                    fee=float(item['Fee'][:-1]),
                    order=int(item['Order Number']),
                    base_total_less_fee=float(item['Base Total Less Fee']),
                    quote_total_less_fee=float(item['Quote Total Less Fee']),
                )
            )

        Stats.objects.bulk_create(data)

        # print(data)

    result = {
        'uploaded_records': len(data)
    }

    return
