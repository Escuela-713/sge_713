from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    RegisterAPIView,
    LoginAPIView,
    CurrentUserView,
)

urlpatterns = [
    path("registro/", RegisterAPIView.as_view(), name="registro"),
    path("login/", LoginAPIView.as_view(), name="login"),
    path("me/", CurrentUserView.as_view(), name="current-user"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token-refresh"),
]
