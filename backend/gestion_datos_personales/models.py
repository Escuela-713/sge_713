from django.db import models


class Rol(models.Model):
    id_rol = models.AutoField(primary_key=True)
    rol = models.CharField(max_length=32)

    class Meta:
        managed = True
        db_table = "rol"
        verbose_name = "Rol"
        verbose_name_plural = "Roles"

    def __str__(self):
        return self.rol


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
    segundo_nombre = models.CharField(max_length=128, blank=True, null=True)
    tercer_nombre = models.CharField(max_length=128, blank=True, null=True)
    primer_apellido = models.CharField(max_length=128)
    segundo_apellido = models.CharField(max_length=128, blank=True, null=True)
    fecha_nacimiento = models.DateField()
    email = models.EmailField(max_length=64)
    telefono = models.CharField(max_length=64)
    genero = models.CharField(
        max_length=3, choices=Genero.choices, default=Genero.SIN_ESPECIFICAR
    )
    dni = models.CharField(max_length=32, unique=True)
    tipo_sangre = models.CharField(
        max_length=3, choices=TipoSanguineo.choices, blank=True, null=True
    )
    calle = models.CharField(max_length=64)
    numero_calle = models.SmallIntegerField()
    barrio = models.CharField(max_length=128)
    id_localidad = models.IntegerField()
    id_localidad_nacimiento = models.IntegerField()

    roles = models.ManyToManyField(Rol, related_name="personas")

    class Meta:
        managed = True
        db_table = "persona"
        verbose_name = "Persona"
        verbose_name_plural = "Personas"

    def __str__(self):
        return str(self.primer_nombre) + " " + str(self.primer_apellido)


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
        Persona, on_delete=models.CASCADE, related_name="alumnos"
    )

    class Meta:
        managed = True
        db_table = "alumno"
        verbose_name = "Alumno"
        verbose_name_plural = "Alumnos"

    def __str__(self):
        return str(self.persona.primer_nombre) + " " + str(self.persona.primer_apellido)


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
        verbose_name = "Tutor"
        verbose_name_plural = "Tutores"

    def __str__(self):
        return str(self.persona.primer_nombre) + " " + str(self.persona.primer_apellido)
