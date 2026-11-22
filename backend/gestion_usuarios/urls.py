from django.urls import path
from .views import CookieTokenRefreshView

from .views import (
    RegisterAPIView,
    LoginAPIView,
    CurrentUserView,
    CookieTokenRefreshView,
    UpdateCurrentUserView,
    LogoutAPIView,
)
urlpatterns = [
    path("registro/", RegisterAPIView.as_view(), name="registro"),
    path("login/", LoginAPIView.as_view(), name="login"),
    path("me/", CurrentUserView.as_view(), name="current-user"),
    path("token/refresh/", CookieTokenRefreshView.as_view(), name="token-refresh"),
    path("me/update/", UpdateCurrentUserView.as_view(), name="update-current-user"),
    path("logout/", LogoutAPIView.as_view(), name="logout"),
]
