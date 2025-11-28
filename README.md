
# **SGE 713 – Sistema de Gestión Escolar**

>**Versión 0.25.2-Alpha**

## **1. Introducción**

El **SGE 713** es un sistema informático desarrollado para optimizar y modernizar la administración integral de la **Escuela N.º 713**.
Permite gestionar de manera digital y centralizada múltiples aspectos institucionales, tales como: estudiantes, personal docente, calificaciones, inventario, reportes, mesas de examen y más.

Su objetivo principal es **agilizar procesos**, **mejorar la organización** y **facilitar el acceso a la información** para los distintos actores de la comunidad educativa.

---

## **2. Arquitectura del Sistema**

El proyecto está estructurado en dos componentes fundamentales que trabajan de forma conjunta:

### **A. `backend/` – Lógica y procesamiento del sistema**

Corresponde al núcleo del sistema, donde se gestionan los datos, se aplican las reglas administrativas y se procesan las solicitudes realizadas por los usuarios.

* **Tecnología utilizada:** *Django* (framework de Python).
* **Módulos principales:**

  * `gestion_carrera_planes_materias`: Administración de carreras, planes y materias.
  * `gestion_datos_personales`: Información de estudiantes, docentes y personal.
  * `gestion_incidencias`: Registro y seguimiento de incidentes o reportes institucionales.
  * `gestion_inventario`: Control del inventario físico (mobiliario, equipamiento, etc.).
  * `gestion_mesa_examenes`: Gestión de mesas de examen y su organización.
  * `gestion_usuarios`: Administración de usuarios y autenticación del sistema.
  * `gestion_home`: Gestion del contenido de la pagina principal 

### **B. `frontend/` – Interfaz de usuario**

Es la parte visual del sistema; permite que los usuarios interactúen de forma intuitiva con la plataforma.

* **Tecnología utilizada:** *Angular 20*.
* **Función principal:** Solicita información al backend, la procesa visualmente y la presenta en pantallas claras y organizadas.

---

## **3. Funcionamiento general**

El funcionamiento del SGE 713 sigue un ciclo simple y eficiente:

1. El usuario interactúa con la interfaz (Frontend).
2. El Frontend envía una solicitud al Backend (por ejemplo: listar estudiantes).
3. El Backend consulta la base de datos, procesa la solicitud y envía la respuesta.
4. El Frontend muestra la información en un formato claro y legible para el usuario.

---

## **4. Puesta en marcha del sistema**

### **A. Iniciar el Backend**

1. Abrir una terminal o consola de comandos.
2. Acceder al directorio del backend:

   ```bash
   cd backend
   ```
3. (Opcional) Activar el entorno virtual:

   * **Linux/MacOS:**

     ```bash
     source env/bin/activate
     ```
   * **Windows:**

     ```bash
     env\Scripts\activate
     ```
4. Ejecutar el servidor de desarrollo:

   ```bash
   python manage.py runserver
   ```

### **B. Iniciar el Frontend**

1. Abrir una **segunda** terminal.
2. Acceder al directorio del frontend:

   ```bash
   cd frontend
   ```
3. Iniciar el servidor de Angular:

   ```bash
   ng serve
   ```
4. Ingresar en el navegador a:

   ```
   http://localhost:4200
   ```
