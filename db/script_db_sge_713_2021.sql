-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-04-2020 a las 06:51:51
-- Versión del servidor: 10.1.30-MariaDB
-- Versión de PHP: 5.6.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mydb`
--
CREATE DATABASE IF NOT EXISTS `mydb` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `mydb`;

DELIMITER $$
--
-- Procedimientos
--
DROP PROCEDURE IF EXISTS `eliminar_cargo`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminar_cargo` (IN `p_id` INT)  BEGIN
delete from cargo
where id_cargo=p_id;
END$$

DROP PROCEDURE IF EXISTS `eliminar_carrera`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminar_carrera` (IN `p_id` INT(11))  BEGIN
DELETE FROM carrera WHERE id_carrera=p_id;
END$$

DROP PROCEDURE IF EXISTS `eliminar_curso`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminar_curso` (IN `p_id_curso` INT(11))  BEGIN
delete 
from curso
where id_curso=p_id_curso;
END$$

DROP PROCEDURE IF EXISTS `eliminar_empleado`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminar_empleado` (IN `p_id` INT(11))  BEGIN
DELETE FROM empleado_x_cargo where id_empleado=p_id;
DELETE FROM persona where id_persona = (select id_persona from empleado where id_empleado=p_id);
DELETE FROM empleado WHERE id_empleado=p_id;
END$$

DROP PROCEDURE IF EXISTS `eliminar_instancia`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminar_instancia` (IN `p_id_instancia` INT(11))  BEGIN
delete 
from instancia
where id_instancia=p_id_instancia;
END$$

DROP PROCEDURE IF EXISTS `eliminar_localidad`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminar_localidad` (IN `p_id` INT)  BEGIN
delete from localidad
where id_localidad=p_id;
END$$

DROP PROCEDURE IF EXISTS `eliminar_materia`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminar_materia` (IN `p_id_materia` INT(11))  BEGIN
delete 
from materia
where id_materia=p_id_materia;
END$$

DROP PROCEDURE IF EXISTS `eliminar_materia_x_plan`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminar_materia_x_plan` (IN `p_id_materia` INT(11), `p_id_plan` INT(11))  BEGIN
delete 
from materia_x_plan
where id_materia=p_id_materia and id_plan=p_id_plan;
END$$

DROP PROCEDURE IF EXISTS `eliminar_pais`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminar_pais` (IN `p_id` INT(11))  BEGIN
DELETE FROM pais WHERE id_pais=p_id;
END$$

DROP PROCEDURE IF EXISTS `eliminar_plan`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminar_plan` (IN `p_id_plan` INT(11))  BEGIN
delete 
from plan
where id_plan=p_id_plan;
END$$

DROP PROCEDURE IF EXISTS `eliminar_provincia`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminar_provincia` (IN `p_id` INT(11))  BEGIN
DELETE FROM provincia WHERE id_provincia=p_id;
END$$

DROP PROCEDURE IF EXISTS `modificar_cargo`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `modificar_cargo` (IN `p_id` INT, `p_nombre` VARCHAR(45), `p_descripcion` VARCHAR(150))  BEGIN
update cargo 
set nombre=p_nombre,
descripcion=p_descripcion
where id_cargo =p_id;
END$$

DROP PROCEDURE IF EXISTS `modificar_carrera`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `modificar_carrera` (IN `p_nombre` VARCHAR(45), `p_estado` VARCHAR(45), `p_plan` VARCHAR(45), `p_titulo_egreso` VARCHAR(120))  BEGIN
UPDATE carrera SET nombre=p_nombre, estado=p_estado, plan=p_titulo_egreso
WHERE id_carrera=p_id;
END$$

DROP PROCEDURE IF EXISTS `modificar_curso`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `modificar_curso` (IN `p_anio` SMALLINT(4), `p_division` VARCHAR(15))  BEGIN
UPDATE curso
SET

anio= p_anio,
division = p_division
WHERE id_curso=p_id;

END$$

DROP PROCEDURE IF EXISTS `modificar_empleado`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `modificar_empleado` (IN `p_id` INT(11), `p_nombre` VARCHAR(45), `p_apellido` VARCHAR(45), `p_sexo` VARCHAR(2), `p_fecha_nacimiento` DATE, `p_estado_civil` INT(11), `p_dni` INT(9), `p_calle` VARCHAR(45), `p_numero` SMALLINT(4), `p_barrio` VARCHAR(45), `p_telefono` VARCHAR(14), `p_id_localidad_residencia` INT(11), `p_fecha_de_ingreso` DATE, `p_legajo` INT(11), `p_id_cargo` INT(11), `p_id_localidad_nacimiento` INT(11))  BEGIN

UPDATE  persona
SET nombre=p_nombre, 
apellido=p_apellido,
sexo=p_sexo, 
fecha_nacimiento=p_fecha_nacimiento, 
id_estado_civil=p_estado_civil, 
dni=p_dni, 
calle=p_calle, 
numero=p_numero, 
barrio=p_barrio, 
telefono=p_telefono, 
id_localidad_nacimiento=p_id_localidad_nacimiento, 
id_localidad=p_id_localidad_residencia
WHERE id_persona=(SELECT id_persona FROM empleado WHERE id_empleado=p_id);

UPDATE empleado 
SET fecha_de_ingreso=p_fecha_de_ingreso, 
legajo=p_legajo
WHERE id_empleado=p_id;


END$$

DROP PROCEDURE IF EXISTS `modificar_instancia`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `modificar_instancia` (IN `p_nombre` VARCHAR(30))  BEGIN
UPDATE instancia 
SET nombre=p_nombre
WHERE id_instancia=p_id;

END$$

DROP PROCEDURE IF EXISTS `modificar_localidad`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `modificar_localidad` (IN `p_nombre` VARCHAR(45), `p_id` INT(11), `p_id_provincia` INT(11), `p_codigo_postal` INT(11))  BEGIN
UPDATE localidad SET nombre=p_nombre, id_provincia=p_id_provincia, codigo_postal=p_codigo_postal
WHERE id_localidad=p_id;
END$$

DROP PROCEDURE IF EXISTS `modificar_materia`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `modificar_materia` (IN `p_id` INT, `p_nombre` VARCHAR(45), `p_descripcion` VARCHAR(45))  BEGIN
UPDATE materia
SET nombre=p_nombre,
descripcion=p_descripcion
WHERE id_materia=p_id;

END$$

DROP PROCEDURE IF EXISTS `modificar_materia_x_plan`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `modificar_materia_x_plan` (IN `p_anio` SMALLINT(4), `p_hs_semanales` SMALLINT(2), `p_hs_anual` SMALLINT(4))  BEGIN
UPDATE materia_x_plan
SET anio = p_anio,
hs_semanales = p_hs_semanales,
hs_anual = p_hs_anual
WHERE id_materia_x_plan=p_id and
id_plan=p_id and
id_materia=p_id;
END$$

DROP PROCEDURE IF EXISTS `modificar_pais`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `modificar_pais` (IN `p_nombre` VARCHAR(40), IN `p_id` INT(11))  BEGIN

UPDATE pais SET nombre=p_nombre
WHERE id_pais=p_id;
END$$

DROP PROCEDURE IF EXISTS `modificar_plan`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `modificar_plan` (IN `p_plan` SMALLINT(2), `p_estado` TINYINT(1), `p_horas_catedra` TINYINT(2), `p_horas_reloj` TINYINT(2))  BEGIN
UPDATE plan
SET
plan=p_plan,
estado=p_estado,
horas_catedra =p_horas_catedra,
horas_reloj = p_horas_reloj
WHERE id_plan = p_id and id_carrera=p_id;
END$$

DROP PROCEDURE IF EXISTS `modificar_provincia`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `modificar_provincia` (IN `p_nombre` VARCHAR(45), `p_id` INT(11), `p_id_pais` INT(11))  BEGIN
UPDATE provincia SET nombre=p_nombre,id_pais=p_id_pais
WHERE id_provincia=p_id;
END$$

DROP PROCEDURE IF EXISTS `nuevo_cargo`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `nuevo_cargo` (IN `p_nombre` VARCHAR(40), `p_descripcion` VARCHAR(150))  BEGIN
INSERT INTO cargo (nombre, descripcion) VALUES (p_nombre, p_descripcion);
END$$

DROP PROCEDURE IF EXISTS `nuevo_carrera`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `nuevo_carrera` (IN `p_nombre` VARCHAR(45), `p_estado` TINYINT(1), `p_titulo_egreso` VARCHAR(125))  BEGIN
INSERT INTO `mydb`.`carrera`
(`nombre`,
`estado`,
`plan`)
VALUES
(`p_nombre`,
`p_estado`,
`p_titulo_egreso`);

END$$

DROP PROCEDURE IF EXISTS `nuevo_curso`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `nuevo_curso` (IN `p_anio` SMALLINT(11), `p_division` VARCHAR(15))  BEGIN
INSERT INTO `mydb`.`curso`
(
`anio`,
`division`)
VALUES
(
`p_anio`,
`p_division`);
END$$

DROP PROCEDURE IF EXISTS `nuevo_empleado`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `nuevo_empleado` (IN `p_nombre` VARCHAR(45), `p_apellido` VARCHAR(45), `p_sexo` VARCHAR(2), `p_fecha_nacimiento` DATE, `p_estado_civil` INT(11), `p_dni` INT(11), `p_calle` VARCHAR(45), `p_numero` SMALLINT(5), `p_barrio` VARCHAR(45), `p_telefono` VARCHAR(14), `p_id_localidad_residencia` INT(11), `p_fecha_de_ingreso` DATE, `p_legajo` INT(12), `p_id_cargo` INT(11), `p_localidad_nacimiento` DATE)  BEGIN
INSERT INTO persona (nombre, apellido,sexo, fecha_nacimiento, id_estado_civil, dni, calle, numero, barrio, telefono, id_localidad_nacimiento, id_localidad) values (p_nombre, p_apellido,  p_sexo, p_fecha_nacimiento,p_estado_civil, p_dni,p_calle,p_numero,p_barrio,p_telefono,p_localidad_nacimiento, p_id_localidad_residencia);
INSERT INTO empleado (fecha_de_ingreso, legajo,id_persona) values (p_fecha_de_ingreso, p_legajo, LAST_INSERT_ID());
INSERT INTO empleado_x_cargo (id_empleado, id_cargo) values (LAST_INSERT_ID(), p_id_cargo);
END$$

DROP PROCEDURE IF EXISTS `nuevo_instancia`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `nuevo_instancia` (IN `p_nombre` VARCHAR(30))  BEGIN
INSERT INTO `mydb`.`instancia`
(`nombre`)
VALUES
(`p_nombre`);
END$$

DROP PROCEDURE IF EXISTS `nuevo_localidad`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `nuevo_localidad` (IN `p_nombre` VARCHAR(40), `p_codigo_postal` INT(11), `p_id_provincia` INT(11))  BEGIN
INSERT INTO localidad (nombre, codigo_postal, id_provincia) values (p_nombre, p_codigo_postal, p_id_provincia);
END$$

DROP PROCEDURE IF EXISTS `nuevo_materia`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `nuevo_materia` (IN `p_nombre` VARCHAR(45), `p_descripcion` VARCHAR(45))  BEGIN
INSERT INTO `mydb`.`materia`
(`nombre`,
`descripcion`)
VALUES
(`p_nombre`,
`p_descripcion`);
END$$

DROP PROCEDURE IF EXISTS `nuevo_materia_x_plan`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `nuevo_materia_x_plan` (`p_anio` SMALLINT(4), `p_hs_semanales` SMALLINT(2), `p_hs_anual` SMALLINT(2))  BEGIN
INSERT INTO `mydb`.`materia_x_plan`
(`anio`,
`hs_semanales`,
`hs_anual`)
VALUES
(`p_anio`,
`p_hs_semanales`,
`p_hs_anual`);
END$$

DROP PROCEDURE IF EXISTS `nuevo_pais`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `nuevo_pais` (IN `p_nombre` VARCHAR(40))  BEGIN
INSERT INTO pais (nombre) VALUES (p_nombre);
END$$

DROP PROCEDURE IF EXISTS `nuevo_plan`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `nuevo_plan` (IN `p_plan` SMALLINT(2), `p_estado` TINYINT(1), `p_horas_catedra` TINYINT(2), `p_horas_reloj` TINYINT(2))  BEGIN
INSERT INTO `mydb`.`plan`
(`id_carrera`,
`plan`,
`estado`,
`horas_catedra`,
`horas_reloj`)
VALUES
(`id_carrera`,
`p_plan`,
`p_estado`,
`p_horas_catedra`,
`p_horas_reloj`);
END$$

DROP PROCEDURE IF EXISTS `nuevo_provincia`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `nuevo_provincia` (IN `p_nombre` VARCHAR(40), `p_id_pais` INT(11))  BEGIN
insert into provincia (nombre, id_pais) values (p_nombre, p_id_pais);
END$$

DROP PROCEDURE IF EXISTS `obtener_cargos`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `obtener_cargos` ()  BEGIN
select * from cargo 
order by nombre;
END$$

DROP PROCEDURE IF EXISTS `obtener_carreras`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `obtener_carreras` ()  BEGIN
SELECT id_carrera, nombre, estado, titulo_egreso
FROM carrera 
ORDER BY nombre ASC;
END$$

DROP PROCEDURE IF EXISTS `obtener_cursos`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `obtener_cursos` ()  BEGIN
select id_curso, division, anio from curso;

END$$

DROP PROCEDURE IF EXISTS `obtener_empleado`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `obtener_empleado` (IN `p_id` INT(11))  BEGIN
SELECT  e.id_empleado, e.fecha_de_ingreso, e.legajo, c.id_cargo, c.nombre as cargo,  p.nombre, p.apellido, p.sexo, p.fecha_nacimiento, p.id_estado_civil,  p.dni, p.calle, p.numero, p.barrio, p.telefono, pro.id_provincia, pron.id_provincia as id_provincia_nac, l.id_localidad, ln.id_localidad as id_localidad_nac, pa.id_pais, pan.id_pais as id_pais_nac
FROM empleado_x_cargo ec 
INNER JOIN empleado e ON e.id_empleado=ec.id_empleado
INNER JOIN persona p ON p.id_persona=e.id_persona
LEFT JOIN localidad l on l.id_localidad=p.id_localidad
LEFT JOIN provincia pro on l.id_provincia=pro.id_provincia
LEFT JOIN pais pa on pro.id_pais= pa.id_pais
LEFT JOIN localidad ln  on p.id_localidad_nacimiento=ln.id_localidad
LEFT JOIN provincia pron on ln.id_provincia=pron.id_provincia
LEFT JOIN pais pan on pan.id_pais=pron.id_pais
LEFT JOIN cargo c ON c.id_cargo=ec.id_cargo
WHERE e.id_empleado=p_id
ORDER BY p.nombre ASC;
END$$

DROP PROCEDURE IF EXISTS `obtener_empleados`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `obtener_empleados` ()  BEGIN
SELECT  e.id_empleado, e.fecha_de_ingreso, e.legajo, c.id_cargo, c.nombre as cargo,  p.nombre, p.apellido, p.dni, p.telefono
FROM empleado_x_cargo ec 
INNER JOIN empleado e ON e.id_empleado=ec.id_empleado
INNER JOIN persona p ON p.id_persona=e.id_persona
LEFT JOIN cargo c ON c.id_cargo=ec.id_cargo
ORDER BY p.nombre ASC;
END$$

DROP PROCEDURE IF EXISTS `obtener_empleados_x_cargo`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `obtener_empleados_x_cargo` (IN `pid_cargo` INT(11))  BEGIN
SELECT e.fecha_de_ingreso, e.legajo, c.nombre, c.descripcion, p.nombre, p.apellido, p.sexo, p.fecha_nacimiento, p.estado_civil, p.estado_civil, p.dni, p.calle, p.numero, p.barrio, p.telefono, p.localidad
FROM empleado_x_cargo ec 
INNER JOIN empleado e ON e.id_empleado=ec.id_empleado
INNER JOIN persona p ON p.id_persona=e.id_persona
INNER JOIN cargo c ON c.id_cargo=ec.id_cargo
ORDER BY p.nombre ASC;
END$$

DROP PROCEDURE IF EXISTS `obtener_estados_civil`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `obtener_estados_civil` ()  BEGIN
SELECT id_estado_civil, nombre
from estado_civil
ORDER BY nombre ASC;
END$$

DROP PROCEDURE IF EXISTS `obtener_instancias`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `obtener_instancias` ()  BEGIN
select id_instancia, nombre from instancia
order by nombre;
END$$

DROP PROCEDURE IF EXISTS `obtener_localidades`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `obtener_localidades` ()  BEGIN
SELECT l.id_localidad, l.nombre, l.codigo_postal, p.nombre as provincia, p.id_provincia, pa.id_pais, pa.nombre as pais FROM localidad l
inner join provincia p on p.id_provincia=l.id_provincia
inner join pais pa on p.id_pais=pa.id_pais
order by l.nombre;
END$$

DROP PROCEDURE IF EXISTS `obtener_localidades_x_provincia`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `obtener_localidades_x_provincia` (IN `pid_provincia` INT(11))  BEGIN
SELECT l.id_localidad, l.nombre, l.codigo_postal, l.id_provincia  
FROM localidad l
WHERE id_provincia = pid_provincia ORDER BY nombre ASC;
END$$

DROP PROCEDURE IF EXISTS `obtener_materias`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `obtener_materias` ()  BEGIN
select id_materia, nombre, descripcion from materia
order by nombre;
END$$

DROP PROCEDURE IF EXISTS `obtener_paises`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `obtener_paises` ()  BEGIN
  SELECT id_pais, nombre FROM mydb.pais ORDER BY nombre ASC;
END$$

DROP PROCEDURE IF EXISTS `obtener_planes`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `obtener_planes` ()  BEGIN
select p.id_plan, car.id_carrera, p.plan, p.estado, p.horas_catedra, p.horas_reloj, car.nombre as carrera 
from carrera car
inner join plan p on p.id_carrera=car.id_carrera
order by nombre;
END$$

DROP PROCEDURE IF EXISTS `obtener_provincias`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `obtener_provincias` ()  BEGIN

SELECT p.id_provincia, p.nombre , pa.nombre as pais, pa.id_pais FROM provincia p
inner join pais pa on pa.id_pais=p.id_pais 
ORDER BY p.nombre ASC;
END$$

DROP PROCEDURE IF EXISTS `obtener_provincia_x_pais`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `obtener_provincia_x_pais` (IN `pid_pais` INT(11))  BEGIN

SELECT p.id_provincia, p.nombre , pa.id_pais, pa.nombre as nombre_pais FROM provincia p
inner join pais pa on pa.id_pais=p.id_pais 
WHERE p.id_pais = pid_pais ORDER BY p.nombre ASC;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumno`
--

DROP TABLE IF EXISTS `alumno`;
CREATE TABLE IF NOT EXISTS `alumno` (
  `id_alumno` int(11) NOT NULL AUTO_INCREMENT,
  `id_curso` int(11) DEFAULT NULL,
  `esc_origen` varchar(45) NOT NULL,
  `legajo` int(11) DEFAULT NULL,
  `fecha_ingreso` date DEFAULT NULL,
  `n_libro_matriz` int(5) DEFAULT NULL,
  `fecha egreso` date DEFAULT NULL,
  `cuil` varchar(15) NOT NULL,
  PRIMARY KEY (`id_alumno`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
--
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumno_x_plan`
--

DROP TABLE IF EXISTS `alumno_x_plan`;
CREATE TABLE IF NOT EXISTS `alumno_x_plan` (
  `id_alumno` int(11) NOT NULL,
  `id_plan` int(11) NOT NULL,
  PRIMARY KEY (`id_alumno`,`id_plan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
--
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cargo`
--

DROP TABLE IF EXISTS `cargo`;
CREATE TABLE IF NOT EXISTS `cargo` (
  `id_cargo` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `descripcion` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id_cargo`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

--
--
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrera`
--

DROP TABLE IF EXISTS `carrera`;
CREATE TABLE IF NOT EXISTS `carrera` (
  `id_carrera` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `titulo_egreso` varchar(125) NOT NULL,
  `id_estado` tinyint(1) NOT NULL,
  PRIMARY KEY (`id_carrera`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

--
--
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `curso`
--

DROP TABLE IF EXISTS `curso`;
CREATE TABLE IF NOT EXISTS `curso` (
  `id_curso` int(11) NOT NULL AUTO_INCREMENT,
  `año` smallint(4) NOT NULL,
  `división` varchar(15) NOT NULL,
  PRIMARY KEY (`id_curso`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
--
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleado`
--

DROP TABLE IF EXISTS `empleado`;
CREATE TABLE IF NOT EXISTS `empleado` (
  `id_empleado` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_de_ingreso` date DEFAULT NULL,
  `legajo` smallint(6) UNSIGNED NOT NULL,
  `id_persona` int(11) NOT NULL,
  PRIMARY KEY (`id_empleado`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

--
-- 
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleado_x_cargo`
--

DROP TABLE IF EXISTS `empleado_x_cargo`;
CREATE TABLE IF NOT EXISTS `empleado_x_cargo` (
  `id_cargo` int(11) NOT NULL,
  `id_empleado` int(11) NOT NULL,
  PRIMARY KEY(`id_cargo`,`id_empleado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_civil`
--

DROP TABLE IF EXISTS `estado_civil`;
CREATE TABLE IF NOT EXISTS `estado_civil` (
  `id_estado_civil` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id_estado_civil`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- 
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `instancia`
--

DROP TABLE IF EXISTS `instancia`;
CREATE TABLE IF NOT EXISTS `instancia` (
  `id_instancia` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) NOT NULL,
  PRIMARY KEY (`id_instancia`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- 
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materia`
--

DROP TABLE IF EXISTS `materia`;
CREATE TABLE IF NOT EXISTS `materia` (
  `id_materia` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `descripción` varchar(45) NOT NULL,
  PRIMARY KEY (`id_materia`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- 
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materia_x_plan`
--

DROP TABLE IF EXISTS `materia_x_plan`;
CREATE TABLE IF NOT EXISTS `materia_x_plan` (
  `id_materia` int(11) NOT NULL,
  `id_plan` int(11) NOT NULL,
  `hs_semanales` smallint(2) NOT NULL,
  `hs_anuales` smallint(2) NOT NULL,
  PRIMARY KEY (`id_materia`,`id_plan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
--
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plan`
--

DROP TABLE IF EXISTS `plan`;
CREATE TABLE IF NOT EXISTS `plan` (
  `id_plan` int(11) NOT NULL AUTO_INCREMENT,
  `id_carrera` int(11) NOT NULL,
  `horas_catedra` tinyint(2) NOT NULL,
  `horas_reloj` tinyint(2) NOT NULL,
  PRIMARY KEY (`id_plan`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
--
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesor_x_materia`
--

DROP TABLE IF EXISTS `profesor_x_materia`;
CREATE TABLE IF NOT EXISTS `profesor_x_materia` (
  `id_materia` int(45) NOT NULL,
  `id_empleado` int(11) NOT NULL,
  PRIMARY KEY (`id_materia`,`id_empleado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
--
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pais`
--

DROP TABLE IF EXISTS `pais`;
CREATE TABLE IF NOT EXISTS `pais` (
  `id_pais` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id_pais`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

--
-- 
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `provincia`
--

DROP TABLE IF EXISTS `provincia`;
CREATE TABLE IF NOT EXISTS `provincia` (
  `id_provincia` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `id_pais` int(11) NOT NULL,
  PRIMARY KEY (`id_provincia`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

--
-- 
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `localidad`
--

DROP TABLE IF EXISTS `localidad`;
CREATE TABLE IF NOT EXISTS `localidad` (
  `id_localidad` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `codigo_postal` smallint(5) UNSIGNED DEFAULT NULL,
  `id_provincia` int(11) NOT NULL,
  PRIMARY KEY (`id_localidad`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

--
-- 
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona`
--

DROP TABLE IF EXISTS `persona`;
CREATE TABLE IF NOT EXISTS `persona` (
  `id_persona` int(11) NOT NULL AUTO_INCREMENT,
  `id_alumno` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `email` varchar (45) NOT NULL,
  `telefono` varchar(45) NOT NULL,
  `id_genero` smallint(1) NOT NULL,
  `dni` int(11) NOT NULL,
  `grupo sanguineo` char(2) DEFAULT NULL,
  `calle` varchar(45) NOT NULL,
  `numero` smallint(4) NOT NULL,
  `barrio` varchar(45) NOT NULL,
  `id_localidad` int(11) NOT NULL,
  `id_localidad_nacimiento` int(11) NOT NULL,
  PRIMARY KEY (`id_persona`),
  KEY `id_localidad_idx` (`id_localidad`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

--
-- 
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `trayectoria`
--

DROP TABLE IF EXISTS `trayectoria`;
CREATE TABLE IF NOT EXISTS `trayectoria` (
  `notas` varchar(45) NOT NULL,
  `observacion` varchar(50) NOT NULL,
  `fecha` date NOT NULL,
  `id_curso` int(11) NOT NULL,
  `id_alumno` int(11) NOT NULL,
  `id_materia` int(11) NOT NULL,
  `id_instancia` int(11) NOT NULL,
  PRIMARY KEY (`id_curso`,`id_alumno`,`id_materia`,`id_instancia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
--
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE IF NOT EXISTS `usuario` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `id_persona` int(11) NOT NULL,
  `contraseña` varchar(45) NOT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
--
--

-- -------------------------------------------------------- 

--
-- Relaciones entre tablas
-- 

ALTER TABLE `alumno_x_plan`
ADD FOREIGN KEY (`id_plan`) REFERENCES `plan`(`id_plan`),
ADD FOREIGN KEY (`id_alumno`) REFERENCES `alumno`(`id_alumno`); 

ALTER TABLE `empleado`
ADD FOREIGN KEY (`id_persona`) REFERENCES `persona`(`id_persona`);

ALTER TABLE `empleado_x_cargo`
ADD FOREIGN KEY (`id_empleado`) REFERENCES `empleado`(`id_empleado`),
ADD FOREIGN KEY (`id_cargo`) REFERENCES `cargo`(`id_cargo`);

ALTER TABLE `materia_x_plan`
ADD FOREIGN KEY (`id_materia`) REFERENCES `materia`(`id_materia`),
ADD FOREIGN KEY (`id_plan`) REFERENCES `plan`(`id_plan`);

ALTER TABLE `plan`
ADD FOREIGN KEY (`id_carrera`) REFERENCES `carrera`(`id_carrera`);

ALTER TABLE `profesor_x_materia`
ADD FOREIGN KEY (`id_empleado`) REFERENCES `empleado`(`id_empleado`),
ADD FOREIGN KEY (`id_materia`) REFERENCES `materia`(`id_materia`); 

ALTER TABLE `localidad`
ADD FOREIGN KEY (`id_provincia`) REFERENCES `provincia`(`id_provincia`);

ALTER TABLE `persona`
ADD FOREIGN KEY (`id_alumno`) REFERENCES `alumno`(`id_alumno`);

ALTER TABLE `trayectoria`
ADD FOREIGN KEY (`id_curso`) REFERENCES `curso`(`id_curso`),
ADD FOREIGN KEY (`id_alumno`) REFERENCES `alumno`(`id_alumno`),
ADD FOREIGN KEY (`id_materia`) REFERENCES `materia`(`id_materia`),
ADD FOREIGN KEY (`id_instancia`) REFERENCES `instancia`(`id_instancia`); 

--
--
--

-- --------------------------------------------------------

-- 
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `provincia`
--
ALTER TABLE `provincia`
  ADD CONSTRAINT `#id_pais` FOREIGN KEY (`id_pais`) REFERENCES `pais` (`id_pais`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `#id_usuario_persona` FOREIGN KEY (`id_persona`) REFERENCES `persona` (`id_persona`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;