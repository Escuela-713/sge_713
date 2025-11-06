from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Publication, CarouselSlide, HomePageSection
from .serializers import PublicationSerializer, CarouselSlideSerializer, HomePageSectionSerializer


class IsAdminAndAuthenticated(permissions.BasePermission):
	"""Permiso combinado: usuario autenticado y staff/administrador."""

	def has_permission(self, request, view):
		return bool(request.user and request.user.is_authenticated and request.user.is_staff)


class PublicationViewSet(viewsets.ModelViewSet):
	"""CRUD para publicaciones de la página home.

	- GET (list, retrieve) es público para cualquiera.
	- POST/PUT/PATCH/DELETE requieren usuario administrador (is_staff).
	Además, usuarios no administradores sólo ven publicaciones con is_published=True.
	"""
	queryset = Publication.objects.all()
	serializer_class = PublicationSerializer

	# def get_permissions(self):
	# 	# Lecturas públicas
	# 	if self.request and self.request.method in permissions.SAFE_METHODS:
	# 		return [permissions.AllowAny()]
	# 	# Escrituras sólo para admins
	# 	return [permissions.IsAdminUser()]

	# def get_queryset(self):
	# 	qs = Publication.objects.all()
	# 	# Si el usuario no es staff, sólo mostrar publicaciones publicadas
	# 	user = getattr(self.request, "user", None)
	# 	if not (user and user.is_staff):
	# 		qs = qs.filter(is_published=True)
	# 	return qs

class HomePageDataView(APIView):
    """API View to get all the data for the home page."""
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        carousel_slides = CarouselSlide.objects.all()
        # Assuming there is only one HomePageSection object
        home_page_section = HomePageSection.objects.first()

        carousel_serializer = CarouselSlideSerializer(carousel_slides, many=True)
        section_serializer = HomePageSectionSerializer(home_page_section)

        data = {
            'carouselSlides': carousel_serializer.data,
            'sectionTitle': section_serializer.data.get('sectionTitle') if home_page_section else '',
        }

        return Response(data)