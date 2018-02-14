from __future__ import absolute_import, unicode_literals

from celery import Task
from core.celery import app
from celery.result import AsyncResult


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

    return
