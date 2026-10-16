from django.urls import path
from .views import CurrentUserView, RegisterAPIView, LoginAPIView

urlpatterns = [
    path("register/", RegisterAPIView.as_view(), name="auth-register"),
    path("login/", LoginAPIView.as_view(), name="auth-login"),
    path("me/", CurrentUserView.as_view(), name="auth-me"),
]
