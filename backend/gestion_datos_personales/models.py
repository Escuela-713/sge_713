from django.db import models


class Rol(models.Model):
    rol = models.CharField(max_length=32)


class Persona(models.Model):
    class Genero(models.TextChoices):
        FEMENINO = "F", "Femenino"
        MASCULINO = "M", "Masculino"
        OTRO = "O", "Otro"
        SIN_ESPECIFICAR = "S", "Sin especificar"

    class TipoSanguineo(models.TextChoices):
        A_P = "A+", "A+"
        A_N = "A-", "A-"
        B_P = "B+", "B+"
        B_N = "B-", "B-"
        AB_P = "AB+", "AB+"
        AB_N = "AB-", "AB-"
        O_P = "O+", "O+"
        O_N = "O-", "O-"

    id_persona = models.AutoField(primary_key=True)
    primer_nombre = models.CharField(max_length=128)
    segundo_nombre = models.CharField(max_length=128)
    tercer_nombre = models.CharField(max_length=128)
    primer_apellido = models.CharField(max_length=128)
    segundo_apellido = models.CharField(max_length=128)
    fecha_nacimiento = models.DateField()
    email = models.CharField(max_length=64)
    telefono = models.CharField(max_length=64)
    genero = models.CharField(
        max_length=3, choices=Genero.choices, default=Genero.SIN_ESPECIFICAR
    )
    dni = models.CharField(max_length=32)
    tipo_sangre = models.CharField(
        max_length=3, choices=TipoSanguineo.choices, blank=True, null=True
    )
    calle = models.CharField(max_length=64)
    numero_calle = models.SmallIntegerField(max_length=16)
    barrio = models.CharField(max_length=128)
    id_localidad = models.IntegerField()
    id_localidad_nacimiento = models.IntegerField()

    roles = models.ManyToManyField(Rol, related_name="Persona")

    class Meta:
        managed = True
        db_table = "persona"


class Alumno(models.Model):
    id_alumno = models.AutoField(primary_key=True)
    id_curso = models.IntegerField(blank=True, null=True)
    esc_origen = models.CharField(max_length=45)
    legajo = models.IntegerField(blank=True, null=True)
    fecha_ingreso = models.DateField(blank=True, null=True)
    n_libro_matriz = models.IntegerField(blank=True, null=True)
    fecha_egreso = models.DateField(db_column="fecha_egreso", blank=True, null=True)
    cuil = models.CharField(max_length=15)

    persona = models.ForeignKey(
        Persona,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="alumnos",
    )

    class Meta:
        managed = True
        db_table = "alumno"


class Tutor(models.Model):
    id_tutor = models.AutoField(primary_key=True)
    profesion = models.CharField(max_length=45)
    lugar_trabajo = models.CharField(max_length=45)

    persona = models.ForeignKey(
        Persona, on_delete=models.CASCADE, related_name="tutores"
    )

    class Meta:
        managed = True
        db_table = "tutor"
