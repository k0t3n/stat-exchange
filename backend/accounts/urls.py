from django.urls import path, include
from rest_framework_jwt.views import refresh_jwt_token

urlpatterns = [
    path('registration/', include('rest_auth.registration.urls')),
    path('refresh-token/', refresh_jwt_token),
    path('', include('rest_auth.urls')),
]
