from django.urls import path, include
from accounts import urls as accounts_urls

urlpatterns = [
    path('accounts/', include(accounts_urls)),
]
