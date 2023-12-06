SELECT 
    alumno.id_alumno AS idAlumno,
	persona.apellido AS apellido,
    persona.nombre AS nombre,
    persona.fecha_nacimiento AS fechaNacimiento,
    persona.telefono AS telefonoAlumno,
    tutor.nombre AS nombreTutor,
    tutor.apellido AS apellidoTutor,
    tutor.telefono AS telefonoTutor,
    asistencia.observaciones AS observaciones,
    asistencia.fecha AS fecha,
    (SELECT 
            COUNT(asistencia.id)
        FROM
            asistencia
                JOIN
            tipo_asistencia ON tipo_asistencia.id = asistencia.id_tipo_asistencia
        WHERE
            tipo_asistencia.nombre = 'presente') 
            AS asistencias,
-- Cuenta las id de las asistencias que tengan como tipo de falta "presente"
    (SELECT 
            COUNT(asistencia.id)
        FROM
            asistencia
                JOIN
            tipo_asistencia ON tipo_asistencia.id = asistencia.id_tipo_asistencia
        WHERE
            tipo_asistencia.nombre = 'ausente') 
            AS inasistencias
-- Cuenta las id de las asistencias que tengan como tipo de falta "ausente"
FROM
    alumno
        JOIN
    persona ON persona.id_alumno = alumno.id_alumno
        JOIN
    asistencia ON asistencia.id_alumno = alumno.id_alumno
        JOIN
    tipo_asistencia ON tipo_asistencia.id = asistencia.id_tipo_asistencia
        JOIN
    curso ON curso.id_curso = alumno.id_curso
        JOIN
    alumno_x_plan ON alumno_x_plan.id_alumno = alumno.id_alumno
        JOIN
    plan ON plan.id_plan = alumno_x_plan.id_plan
        JOIN
    carrera ON carrera.id_carrera = plan.id_carrera
		JOIN
	tutor ON tutor.id_alumno = alumno.id_alumno

WHERE
	persona.id_alumno Is not null
/* ------------------------Nota en uso del Where ---------------------------------
---- Como el código va a usar python, 
este no necesita muchas acomodaciones con el where, 
puesto que los mismos van a ser parametros en alguna función de filtrado, 
por lo que tengo entendido. 
Dejo un ejemplo con una pequeña idea del concepto de igual forma:

AND	carrera.nombre = "ETP"
AND curso.anio = 7 (o séptimo, como decidan)
AND curso.division = 1
AND asistencia.fecha = 04/10/2015
*/

/* --------------------Nota en Promedio de Asistencias ---------------------------
----Esto debería de sacar el promedio entre las asistencias e inasistencias, 
pero tengo el presentimiento de que esta operación se podría hacer más eficiente si
se hace un pequeño script en js o algo similar, 
para que en vez de enviar esta linea 30 veces por curso, 
se envíe el archivo js una vez y se llame dentro del computador esas 30 veces. ----

(select (select count(asistencia.id) from asistencia
join tipoasistencia on tipoasistencia.id = asistencia.idTipoFalta
where tipoasistencia.nombre = "ausente")/
(select count(asistencia.id) from asistencia
join tipoasistencia on tipoasistencia.id = asistencia.idTipoFalta
where tipoasistencia.nombre = "presente") as PorcentajeAsistencias
*/

/* ----------------------Nota sobre group by -------------------------------------
Tengo errores al intentar agrupar los queries, por lo cual lo dejo a responsabilidad
de los siguientes años. >:)
Por lo que vi, tiene que ver con cierta configuración llamada ONLY_FULL_GROUP_BY,
la cual impide que agrupes en base a solo una columna, pero no se.
POR SUERTE, creo yo que no se necesita de un group by, o que al menos es plausible
la ejecución correcta (de este sql) sin el uso de uno.
*/