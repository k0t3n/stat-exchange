from django.urls import path, include

from rest_framework import routers
from rest_framework_jwt.views import refresh_jwt_token

from accounts import views

# router = routers.DefaultRouter()
# router.register(r'users', views.UserViewSet)
# router.register(r'groups', views.GroupViewSet)

urlpatterns = [
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('registration/', include('rest_auth.registration.urls')),
    path('refresh-token/', refresh_jwt_token),
    path('', include('rest_auth.urls')),
    # path('', include(router.urls)),
]
