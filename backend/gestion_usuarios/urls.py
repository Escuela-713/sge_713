from django.urls import path
from .views import RegisterAPIView, LoginAPIView

urlpatterns = [
	path('auth/register/', RegisterAPIView.as_view(), name='auth-register'),
	path('auth/login/', LoginAPIView.as_view(), name='auth-login'),
]
