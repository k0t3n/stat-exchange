from django.urls import path, include

from rest_framework import routers
from rest_framework.authtoken import views as token_views

from accounts import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)

urlpatterns = [
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('auth', token_views.obtain_auth_token),
    path('', include(router.urls)),
]
