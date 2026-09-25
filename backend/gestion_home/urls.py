from django.urls import path, include
from rest_framework.routers import DefaultRouter

from gestion_home.views import CategoriesView, PublicationView, PublicationDetailView

urlpatterns = [
	path('home/', PublicationView.as_view()),
    path('home/<int:pk>/', PublicationDetailView.as_view()),
    path('home/categories/', CategoriesView.as_view()),
]