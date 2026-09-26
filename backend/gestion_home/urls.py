from django.urls import path, include
from rest_framework.routers import DefaultRouter

from gestion_home.views import CategoriesView, PublicationView, CarrouselView

urlpatterns = [
	path('home/', PublicationView.as_view()),
    path('home/publications/', PublicationView.as_view()),
    path('home/categories/', CategoriesView.as_view()),
    path('home/carrousel/', CarrouselView.as_view())
]