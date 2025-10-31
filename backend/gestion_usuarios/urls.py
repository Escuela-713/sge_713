from django.urls import path
from .views import RegisterAPIView, LoginAPIView

urlpatterns = [
	path('api/auth/register/', RegisterAPIView.as_view(), name='auth-register'),
	path('api/auth/login/', LoginAPIView.as_view(), name='auth-login'),
]
