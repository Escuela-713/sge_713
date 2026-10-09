from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BienesViewSet

router = DefaultRouter()
router.register(r'bienes', BienesViewSet, basename='bienes')

urlpatterns = [
    path('', include(router.urls)),
]