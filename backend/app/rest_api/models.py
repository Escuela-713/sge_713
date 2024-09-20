# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Alumno(models.Model):
    id_alumno = models.AutoField(primary_key=True)
    id_curso = models.IntegerField(blank=True, null=True)
    esc_origen = models.CharField(max_length=45)
    legajo = models.IntegerField(blank=True, null=True)
    fecha_ingreso = models.DateField(blank=True, null=True)
    n_libro_matriz = models.IntegerField(blank=True, null=True)
    fecha_egreso = models.DateField(db_column='fecha egreso', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    cuil = models.CharField(max_length=15)

    class Meta:
        managed = False
        db_table = 'alumno'


class AlumnoXPlan(models.Model):
    id_alumno = models.OneToOneField(Alumno, models.DO_NOTHING, db_column='id_alumno', primary_key=True)  # The composite primary key (id_alumno, id_plan) found, that is not supported. The first column is selected.
    id_plan = models.ForeignKey('Plan', models.DO_NOTHING, db_column='id_plan')

    class Meta:
        managed = False
        db_table = 'alumno_x_plan'
        unique_together = (('id_alumno', 'id_plan'),)


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class Cargo(models.Model):
    id_cargo = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=45)
    descripcion = models.CharField(max_length=150, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'cargo'


class Carrera(models.Model):
    id_carrera = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=45)
    titulo_egreso = models.CharField(max_length=125)
    id_estado = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'carrera'


class Curso(models.Model):
    id_curso = models.AutoField(primary_key=True)
    anio = models.SmallIntegerField()
    division = models.CharField(max_length=15)

    class Meta:
        managed = False
        db_table = 'curso'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Empleado(models.Model):
    id_empleado = models.AutoField(primary_key=True)
    fecha_de_ingreso = models.DateField(blank=True, null=True)
    legajo = models.PositiveSmallIntegerField()
    id_persona = models.ForeignKey('Persona', models.DO_NOTHING, db_column='id_persona')

    class Meta:
        managed = False
        db_table = 'empleado'


class EmpleadoXCargo(models.Model):
    id_cargo = models.OneToOneField(Cargo, models.DO_NOTHING, db_column='id_cargo', primary_key=True)  # The composite primary key (id_cargo, id_empleado) found, that is not supported. The first column is selected.
    id_empleado = models.ForeignKey(Empleado, models.DO_NOTHING, db_column='id_empleado')

    class Meta:
        managed = False
        db_table = 'empleado_x_cargo'
        unique_together = (('id_cargo', 'id_empleado'),)


class EstadoCivil(models.Model):
    id_estado_civil = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=45)

    class Meta:
        managed = False
        db_table = 'estado_civil'


class Instancia(models.Model):
    id_instancia = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)

    class Meta:
        managed = False
        db_table = 'instancia'


class Localidad(models.Model):
    id_localidad = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=45)
    codigo_postal = models.PositiveSmallIntegerField(blank=True, null=True)
    id_provincia = models.ForeignKey('Provincia', models.DO_NOTHING, db_column='id_provincia')

    class Meta:
        managed = False
        db_table = 'localidad'


class Materia(models.Model):
    id_materia = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=45)
    descripcion = models.CharField(max_length=45)

    class Meta:
        managed = False
        db_table = 'materia'


class MateriaXPlan(models.Model):
    id_materia = models.OneToOneField(Materia, models.DO_NOTHING, db_column='id_materia', primary_key=True)  # The composite primary key (id_materia, id_plan) found, that is not supported. The first column is selected.
    id_plan = models.ForeignKey('Plan', models.DO_NOTHING, db_column='id_plan')
    hs_semanales = models.SmallIntegerField()
    hs_anuales = models.SmallIntegerField()

    class Meta:
        managed = False
        db_table = 'materia_x_plan'
        unique_together = (('id_materia', 'id_plan'),)


class Pais(models.Model):
    id_pais = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=45)

    class Meta:
        managed = False
        db_table = 'pais'


class Persona(models.Model):
    id_persona = models.AutoField(primary_key=True)
    id_alumno = models.ForeignKey(Alumno, models.DO_NOTHING, db_column='id_alumno')
    nombre = models.CharField(max_length=45)
    apellido = models.CharField(max_length=45)
    fecha_nacimiento = models.DateField()
    email = models.CharField(max_length=45)
    telefono = models.CharField(max_length=45)
    id_genero = models.SmallIntegerField()
    dni = models.IntegerField()
    grupo_sanguineo = models.CharField(db_column='grupo sanguineo', max_length=2, blank=True, null=True)  # Field renamed to remove unsuitable characters.
    calle = models.CharField(max_length=45)
    numero = models.SmallIntegerField()
    barrio = models.CharField(max_length=45)
    id_localidad = models.IntegerField()
    id_localidad_nacimiento = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'persona'


class Plan(models.Model):
    id_plan = models.AutoField(primary_key=True)
    id_carrera = models.ForeignKey(Carrera, models.DO_NOTHING, db_column='id_carrera')
    horas_catedra = models.IntegerField()
    horas_reloj = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'plan'


class ProfesorXMateria(models.Model):
    id_materia = models.OneToOneField(Materia, models.DO_NOTHING, db_column='id_materia', primary_key=True)  # The composite primary key (id_materia, id_empleado) found, that is not supported. The first column is selected.
    id_empleado = models.ForeignKey(Empleado, models.DO_NOTHING, db_column='id_empleado')

    class Meta:
        managed = False
        db_table = 'profesor_x_materia'
        unique_together = (('id_materia', 'id_empleado'),)


class Provincia(models.Model):
    id_provincia = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=45)
    id_pais = models.ForeignKey(Pais, models.DO_NOTHING, db_column='id_pais')

    class Meta:
        managed = False
        db_table = 'provincia'


class Trayectoria(models.Model):
    notas = models.CharField(max_length=45)
    observacion = models.CharField(max_length=50)
    fecha = models.DateField()
    id_curso = models.OneToOneField(Curso, models.DO_NOTHING, db_column='id_curso', primary_key=True)  # The composite primary key (id_curso, id_alumno, id_materia, id_instancia) found, that is not supported. The first column is selected.
    id_alumno = models.ForeignKey(Alumno, models.DO_NOTHING, db_column='id_alumno')
    id_materia = models.ForeignKey(Materia, models.DO_NOTHING, db_column='id_materia')
    id_instancia = models.ForeignKey(Instancia, models.DO_NOTHING, db_column='id_instancia')

    class Meta:
        managed = False
        db_table = 'trayectoria'
        unique_together = (('id_curso', 'id_alumno', 'id_materia', 'id_instancia'),)


class Usuario(models.Model):
    id_usuario = models.AutoField(primary_key=True)
    id_persona = models.ForeignKey(Persona, models.DO_NOTHING, db_column='id_persona')
    contrasenia = models.CharField(max_length=45)

    class Meta:
        managed = False
        db_table = 'usuario'
