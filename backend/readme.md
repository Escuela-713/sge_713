
# 📚 Documentación de la API REST - Sistema de Gestión Educativa (SGE)

Bienvenido a la documentación oficial de la API REST desarrollada con **Django REST Framework**.  
Esta API permite gestionar carreras, planes de estudio, materias, cursos e instancias académicas de manera sencilla mediante peticiones **HTTP estándar**.

---

## 📝 1. Resumen de la aplicación
La API proporciona servicios para interactuar con datos académicos y personales.  
Está diseñada para integrarse fácilmente con aplicaciones cliente (web, móvil, escritorio).

---

## 🔗 2. Endpoints disponibles

### 🎓 Carreras, Planes y Materias
| Endpoint      | Método | Descripción |
|---------------|--------|-------------|
| `/carrera/`   | GET / POST / PUT / DELETE | Gestión de carreras |
| `/plan/`      | GET / POST / PUT / DELETE | Gestión de planes de estudio |
| `/materia/`   | GET / POST / PUT / DELETE | Gestión de materias |

### 📘 Datos Académicos
| Endpoint      | Método | Descripción |
|---------------|--------|-------------|
| `/instancia/` | GET / POST / PUT / DELETE | Gestión de instancias académicas |
| `/curso/`     | GET / POST / PUT / DELETE | Gestión de cursos |

---

## 📥 3. Datos requeridos

### Carreras
```json
{
  "nombre": "Ingeniería en Sistemas",
  "estado": true
}
````

### Planes

```json
{
  "id_carrera": 1,
  "nombre": "Plan 2023",
  "estado": true,
  "horas_catedra": 120,
  "horas_reloj": 90
}
```

### Materias

```json
{
  "nombre": "Programación I",
  "id_plan": 1,
  "anio": 1,
  "estado": true
}
```

### Cursos

```json
{
  "anio_lectivo": 2023,
  "division": "A",
  "id_carrera": 1,
  "id_plan": 1
}
```

### Instancias

```json
{
  "nombre": "Examen Final",
  "fecha": "2023-12-10"
}
```

---

## 🚀 4. Expansión de funcionalidades

Para agregar un nuevo endpoint:

1. Crear modelo en `app/rest_api/models.py`
2. Crear serializador en `app/rest_api/[módulo]/serializers.py`
3. Implementar vista en `app/rest_api/[módulo]/views.py`
4. Definir ruta en `app/rest_api/[módulo]/urls.py`
5. Documentar siguiendo este mismo formato ✅

---

## 🔐 5. Autenticación y Autorización

La API utiliza el sistema de autenticación de **Django**:

* 🔑 El usuario debe estar autenticado para acceder.
* 👥 Los permisos dependen del **rol** asignado en el sistema.

---

## 📡 6. Códigos de respuesta

| Código   | Significado           |
| -------- | --------------------- |
| `200` ✅  | Operación exitosa     |
| `201` 🆕 | Recurso creado        |
| `400` ⚠️ | Solicitud inválida    |
| `401` 🔒 | No autorizado         |
| `403` ⛔  | Prohibido             |
| `404` ❓  | Recurso no encontrado |
| `500` 💥 | Error interno         |

---

## 🧩 7. Ejemplos de uso

### Obtener lista de carreras

```http
GET /carrera/
Content-Type: application/json
```

### Crear un nuevo plan

```http
POST /plan/
Content-Type: application/json

{
  "nombre": "Plan 2023",
  "id_carrera": 1,
  "estado": true,
  "horas_catedra": 120,
  "horas_reloj": 90
}
```

### Consultar cursos por año lectivo

```http
GET /curso/?anio_lectivo=2023
Content-Type: application/json
```

---

## 📂 8. Estructura del proyecto

```
app/
 ├── app/                  # Configuración del proyecto Django
 ├── rest_api/             # Aplicación principal
 │    ├── carreras_planes_materias/  # Gestión académica
 │    ├── datos_academicos/          # Cursos e instancias
 │    ├── datos_personales/          # Información de alumnos
 │    └── usuarios/                  # Gestión de usuarios
 └── manage.py             # Script de gestión de Django
```

---

## ⚙️ 9. Requisitos técnicos

* 🐍 Python **3.8+**
* 🌐 Django **3.2+**
* 🔧 Django REST Framework
* 🗄️ PostgreSQL

> 📌 Los requisitos completos están en `requirements.txt`

---

## 🛠️ 10. Instalación y ejecución

### 🔹 Configuración inicial

```bash
# Clonar el repositorio
git clone https://github.com/Escuela-713/sge_713/
cd sge_713/backend

# Crear entorno virtual
python -m venv venv
source venv/bin/activate   # Linux/Mac
venv\Scripts\activate      # Windows

# Instalar dependencias
pip install -r requirements.txt
```

### 🔹 Configuración de base de datos

```sql
CREATE DATABASE sge_713;
CREATE USER sge_user WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE sge_713 TO sge_user;
```

Editar `app/app/settings.py`:

```python
DATABASES = {
  'default': {
      'ENGINE': 'django.db.backends.postgresql',
      'NAME': 'sge_713',
      'USER': 'sge_user',
      'PASSWORD': 'password',
      'HOST': 'localhost',
      'PORT': '5432',
  }
}
```

### 🔹 Migraciones

```bash
python app/manage.py makemigrations
python app/manage.py migrate
python app/manage.py createsuperuser   # opcional
```

### 🔹 Ejecutar servidor

```bash
python app/manage.py runserver
```

* 🌐 API REST → [http://localhost:8000/](http://localhost:8000/)
* 🔑 Admin Django → [http://localhost:8000/admin/](http://localhost:8000/admin/)

---

## 🌍 Ejecución en Producción

1. Configurar servidor web (**Nginx / Apache**)
2. Usar **Gunicorn** como WSGI:

   ```bash
   pip install gunicorn
   gunicorn --chdir app app.wsgi:application --bind 0.0.0.0:8000
   ```
3. Configurar **variables de entorno** para credenciales
4. Desactivar `DEBUG` en `settings.py`
5. Definir correctamente `ALLOWED_HOSTS`
