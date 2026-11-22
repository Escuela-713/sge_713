from django.utils import timezone
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from .models import Bienes, Categoria, Ubicacion

OBLIGATORIO = 'Falta dato obligatorio'


class NombreRelacionadoField(serializers.SlugRelatedField):
    """
    Recibe y devuelve el nombre (ej: "Mobiliario"). Si no existe, se crea al guardar,
    así el formulario actual (inputs de texto) sigue funcionando hasta que el
    frontend use listas desplegables.
    """
    default_error_messages = {'required': OBLIGATORIO, 'null': OBLIGATORIO}

    def __init__(self, **kwargs):
        super().__init__(slug_field='nombre', **kwargs)

    def to_internal_value(self, data):
        nombre = str(data).strip() if data is not None else ''
        if not nombre:
            raise serializers.ValidationError(OBLIGATORIO)
        modelo = self.get_queryset().model
        maximo = modelo._meta.get_field('nombre').max_length
        if len(nombre) > maximo:
            raise serializers.ValidationError(f'Máximo {maximo} caracteres.')
        return modelo.objects.filter(nombre__iexact=nombre).first() or modelo(nombre=nombre)


class BienesSerializer(serializers.ModelSerializer):
    categoria = NombreRelacionadoField(queryset=Categoria.objects.all())
    ubicacion = NombreRelacionadoField(queryset=Ubicacion.objects.all())

    class Meta:
        model = Bienes
        fields = '__all__'
        read_only_fields = ['id_bien', 'prestado']
        extra_kwargs = {
            'nombre': {
                'min_length': 3,
                'error_messages': {
                    'required': OBLIGATORIO, 'blank': OBLIGATORIO, 'null': OBLIGATORIO,
                    'min_length': 'El nombre debe tener al menos 3 caracteres.',
                    'max_length': 'El nombre puede tener hasta 45 caracteres.',
                },
            },
            'estado': {
                'error_messages': {
                    'required': OBLIGATORIO, 'blank': OBLIGATORIO, 'null': OBLIGATORIO,
                    'invalid_choice': '"{input}" no es un estado válido.',
                },
            },
            'cantidad': {
                'required': True,
                'min_value': 1,
                'error_messages': {
                    'required': OBLIGATORIO, 'null': OBLIGATORIO,
                    'invalid': 'La cantidad debe ser un número entero.',
                    'min_value': 'La cantidad debe ser al menos 1.',
                },
            },
            'codigo_especial': {'validators': []},  # la unicidad se valida abajo
            'descripcion': {
                'error_messages': {'max_length': 'La descripción puede tener hasta 150 caracteres.'},
            },
            'fecha_adquisicion': {
                'error_messages': {'invalid': 'Fecha inválida, usá el formato AAAA-MM-DD.'},
            },
        }

    def validate_codigo_especial(self, valor):
        valor = (valor or '').strip() or None
        if valor:
            existentes = Bienes.objects.filter(codigo_especial__iexact=valor)
            if self.instance:
                existentes = existentes.exclude(pk=self.instance.pk)
            if existentes.exists():
                raise serializers.ValidationError('Ya existe un bien con ese código especial.')
        return valor

    def validate_fecha_adquisicion(self, valor):
        if valor and valor > timezone.localdate():
            raise serializers.ValidationError('La fecha de adquisición no puede ser futura.')
        return valor

    def validate(self, attrs):
        cantidad = attrs.get('cantidad', getattr(self.instance, 'cantidad', None))
        prestado = self.instance.prestado if self.instance else 0
        if cantidad is not None and cantidad < prestado:
            raise serializers.ValidationError(
                {'cantidad': 'La cantidad no puede ser menor a la cantidad prestada.'}
            )
        return attrs

    def _guardar_relacionados(self, datos):
        for campo in ('categoria', 'ubicacion'):
            objeto = datos.get(campo)
            if objeto is not None and objeto.pk is None:
                objeto.save()

    def create(self, validated_data):
        self._guardar_relacionados(validated_data)
        return super().create(validated_data)

    def update(self, instance, validated_data):
        self._guardar_relacionados(validated_data)
        return super().update(instance, validated_data)


class CategoriaSerializer(serializers.ModelSerializer):
    nombre = serializers.CharField(
        max_length=45,
        error_messages={'required': OBLIGATORIO, 'blank': OBLIGATORIO,
                        'max_length': 'El nombre puede tener hasta 45 caracteres.'},
        validators=[UniqueValidator(queryset=Categoria.objects.all(), lookup='iexact',
                                    message='Ya existe una categoría con ese nombre.')],
    )

    class Meta:
        model = Categoria
        fields = '__all__'
        read_only_fields = ['id_categoria']


class UbicacionSerializer(serializers.ModelSerializer):
    nombre = serializers.CharField(
        max_length=100,
        error_messages={'required': OBLIGATORIO, 'blank': OBLIGATORIO,
                        'max_length': 'El nombre puede tener hasta 100 caracteres.'},
        validators=[UniqueValidator(queryset=Ubicacion.objects.all(), lookup='iexact',
                                    message='Ya existe una ubicación con ese nombre.')],
    )

    class Meta:
        model = Ubicacion
        fields = '__all__'
        read_only_fields = ['id_ubicacion']