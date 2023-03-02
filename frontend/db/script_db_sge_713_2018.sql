-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-06-2019 a las 19:15:05
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
CREATE DATABASE IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
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

DROP PROCEDURE IF EXISTS `eliminar_empleado`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminar_empleado` (IN `p_id` INT(11))  BEGIN
DELETE FROM empleado_x_cargo where id_empleado=p_id;
DELETE FROM persona where id_persona = (select id_persona from empleado where id_empleado=p_id);
DELETE FROM empleado WHERE id_empleado=p_id;
END$$

DROP PROCEDURE IF EXISTS `eliminar_localidad`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminar_localidad` (IN `p_id` INT)  BEGIN
delete from localidad
where id_localidad=p_id;
END$$

DROP PROCEDURE IF EXISTS `eliminar_pais`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminar_pais` (IN `p_id` INT(11))  BEGIN
DELETE FROM pais WHERE id_pais=p_id;
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
CREATE DEFINER=`root`@`localhost` PROCEDURE `modificar_carrera` (IN `p_nombre` VARCHAR(45), `p_estado` VARCHAR(45), `p_plan` VARCHAR(45), `p_id` INT(11))  BEGIN
UPDATE carrera SET nombre=p_nombre, estado=p_estado, plan=p_plan
WHERE id_carrera=p_id;
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

DROP PROCEDURE IF EXISTS `modificar_localidad`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `modificar_localidad` (IN `p_nombre` VARCHAR(45), `p_id` INT(11), `p_id_provincia` INT(11), `p_codigo_postal` INT(11))  BEGIN
UPDATE localidad SET nombre=p_nombre, id_provincia=p_id_provincia, codigo_postal=p_codigo_postal
WHERE id_localidad=p_id;
END$$

DROP PROCEDURE IF EXISTS `modificar_pais`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `modificar_pais` (IN `p_nombre` VARCHAR(40), IN `p_id` INT(11))  BEGIN

UPDATE pais SET nombre=p_nombre
WHERE id_pais=p_id;
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
CREATE DEFINER=`root`@`localhost` PROCEDURE `nuevo_carrera` (IN `p_nombre` VARCHAR(40), `p_estado` BINARY(1), `p_plan` INT(11))  BEGIN
INSERT INTO carrera (nombre, estado, plan) values (p_nombre, p_estado, p_plan);
END$$

DROP PROCEDURE IF EXISTS `nuevo_curso`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `nuevo_curso` (IN `p_nombre` VARCHAR(40), `p_id_orientacion` INT(11))  BEGIN
INSERT INTO curso (nonbre, id_orientacion) VALUES (p_nombre, p_id_orientacion);
END$$

DROP PROCEDURE IF EXISTS `nuevo_empleado`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `nuevo_empleado` (IN `p_nombre` VARCHAR(45), `p_apellido` VARCHAR(45), `p_sexo` VARCHAR(2), `p_fecha_nacimiento` DATE, `p_estado_civil` INT(11), `p_dni` INT(11), `p_calle` VARCHAR(45), `p_numero` SMALLINT(5), `p_barrio` VARCHAR(45), `p_telefono` VARCHAR(14), `p_id_localidad_residencia` INT(11), `p_fecha_de_ingreso` DATE, `p_legajo` INT(12), `p_id_cargo` INT(11), `p_localidad_nacimiento` DATE)  BEGIN
INSERT INTO persona (nombre, apellido,sexo, fecha_nacimiento, id_estado_civil, dni, calle, numero, barrio, telefono, id_localidad_nacimiento, id_localidad) values (p_nombre, p_apellido,  p_sexo, p_fecha_nacimiento,p_estado_civil, p_dni,p_calle,p_numero,p_barrio,p_telefono,p_localidad_nacimiento, p_id_localidad_residencia);
INSERT INTO empleado (fecha_de_ingreso, legajo,id_persona) values (p_fecha_de_ingreso, p_legajo, LAST_INSERT_ID());
INSERT INTO empleado_x_cargo (id_empleado, id_cargo) values (LAST_INSERT_ID(), p_id_cargo);
END$$

DROP PROCEDURE IF EXISTS `nuevo_localidad`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `nuevo_localidad` (IN `p_nombre` VARCHAR(40), `p_codigo_postal` INT(11), `p_id_provincia` INT(11))  BEGIN
INSERT INTO localidad (nombre, codigo_postal, id_provincia) values (p_nombre, p_codigo_postal, p_id_provincia);
END$$

DROP PROCEDURE IF EXISTS `nuevo_pais`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `nuevo_pais` (IN `p_nombre` VARCHAR(40))  BEGIN
INSERT INTO pais (nombre) VALUES (p_nombre);
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
SELECT id_carrera, nombre, estado, plan 
FROM carrera 
ORDER BY nombre ASC;
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
LEFT JOIN localidad ln	on p.id_localidad_nacimiento=ln.id_localidad
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

DROP PROCEDURE IF EXISTS `obtener_paises`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `obtener_paises` ()  BEGIN
	SELECT id_pais, nombre FROM mydb.pais ORDER BY nombre ASC;
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
-- Volcado de datos para la tabla `cargo`
--

INSERT INTO `cargo` (`id_cargo`, `nombre`, `descripcion`) VALUES
(2, 'PEP', ''),
(3, 'POT', ''),
(4, 'Preceptor', ''),
(6, 'Directivo', ''),
(10, 'Profesor', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrera`
--

DROP TABLE IF EXISTS `carrera`;
CREATE TABLE IF NOT EXISTS `carrera` (
  `id_carrera` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `estado` tinyint(1) DEFAULT NULL,
  `plan` int(11) NOT NULL,
  PRIMARY KEY (`id_carrera`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `carrera`
--

INSERT INTO `carrera` (`id_carrera`, `nombre`, `estado`, `plan`) VALUES
(1, 'ETP', 0, 2018),
(3, 'Humanidades', 0, 2018),
(4, 'Forestal', 0, 2000),
(5, 'Comunicaciones', 0, 2017),
(12, 'Bienes y Servicios', 1, 2000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `curso`
--

DROP TABLE IF EXISTS `curso`;
CREATE TABLE IF NOT EXISTS `curso` (
  `id_curso` int(11) NOT NULL AUTO_INCREMENT,
  `id_orientacion` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id_curso`),
  KEY `fk_Curso_Orientacion1_idx` (`id_orientacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  PRIMARY KEY (`id_empleado`),
  KEY `fk_Empleado_Personas1_idx` (`id_persona`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `empleado`
--

INSERT INTO `empleado` (`id_empleado`, `fecha_de_ingreso`, `legajo`, `id_persona`) VALUES
(12, '2011-02-02', 65535, 12);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleado_x_cargo`
--

DROP TABLE IF EXISTS `empleado_x_cargo`;
CREATE TABLE IF NOT EXISTS `empleado_x_cargo` (
  `id_cargo` int(11) NOT NULL,
  `id_empleado` int(11) NOT NULL,
  PRIMARY KEY (`id_cargo`,`id_empleado`),
  KEY `fk_Empleado x Cargo_Empleado1_idx` (`id_empleado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `empleado_x_cargo`
--

INSERT INTO `empleado_x_cargo` (`id_cargo`, `id_empleado`) VALUES
(10, 12);

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
-- Volcado de datos para la tabla `estado_civil`
--

INSERT INTO `estado_civil` (`id_estado_civil`, `nombre`) VALUES
(1, 'Casado'),
(2, 'Soltero'),
(3, 'Divorciado'),
(4, 'Viudo');

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
  PRIMARY KEY (`id_localidad`),
  KEY `fk_Localidad_Provincia1_idx` (`id_provincia`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `localidad`
--

INSERT INTO `localidad` (`id_localidad`, `nombre`, `codigo_postal`, `id_provincia`) VALUES
(1, 'Esquel', 9200, 1),
(5, 'Trevelin', 0, 1),
(16, 'CÃ³rdoba', 5000, 14),
(17, 'CABA', 0, 22);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materia`
--

DROP TABLE IF EXISTS `materia`;
CREATE TABLE IF NOT EXISTS `materia` (
  `id_materia` int(11) NOT NULL AUTO_INCREMENT,
  `id_orientacion` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_materia`),
  KEY `fk_Materia_Orientacion1_idx` (`id_orientacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pais`
--

DROP TABLE IF EXISTS `pais`;
CREATE TABLE IF NOT EXISTS `pais` (
  `id_pais` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id_pais`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `pais`
--

INSERT INTO `pais` (`id_pais`, `nombre`) VALUES
(1, 'Argentina'),
(12, 'Chile'),
(22, 'Bolivia ');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona`
--

DROP TABLE IF EXISTS `persona`;
CREATE TABLE IF NOT EXISTS `persona` (
  `id_persona` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `sexo` varchar(45) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `id_estado_civil` int(11) DEFAULT NULL,
  `dni` int(11) UNSIGNED NOT NULL,
  `grupo sanguinio` char(2) DEFAULT NULL,
  `calle` varchar(45) DEFAULT NULL,
  `numero` smallint(4) DEFAULT NULL,
  `barrio` varchar(45) DEFAULT NULL,
  `telefono` varchar(14) DEFAULT NULL,
  `id_localidad` int(11) DEFAULT NULL,
  `id_localidad_nacimiento` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_persona`),
  KEY `id_localidad_idx` (`id_localidad`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `persona`
--

INSERT INTO `persona` (`id_persona`, `nombre`, `apellido`, `sexo`, `fecha_nacimiento`, `id_estado_civil`, `dni`, `grupo sanguinio`, `calle`, `numero`, `barrio`, `telefono`, `id_localidad`, `id_localidad_nacimiento`) VALUES
(12, 'EstefanÃ­a Soledad', 'LÃ³pez', 'F', '1978-01-01', 1, 26915087, NULL, 'San MartÃ­n', 451, 'Malvinas', '2945-1544000', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesor_x_materia`
--

DROP TABLE IF EXISTS `profesor_x_materia`;
CREATE TABLE IF NOT EXISTS `profesor_x_materia` (
  `id_materia` varchar(45) NOT NULL,
  `id_empleado` int(11) NOT NULL,
  PRIMARY KEY (`id_materia`,`id_empleado`),
  KEY `fk_Profesor x Materia_Empleado1_idx` (`id_empleado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `provincia`
--

DROP TABLE IF EXISTS `provincia`;
CREATE TABLE IF NOT EXISTS `provincia` (
  `id_provincia` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `id_pais` int(11) NOT NULL,
  PRIMARY KEY (`id_provincia`),
  KEY `fk_Provincia_Pais1_idx` (`id_pais`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `provincia`
--

INSERT INTO `provincia` (`id_provincia`, `nombre`, `id_pais`) VALUES
(1, 'Chubut', 1),
(14, 'CÃ³rdoba', 1),
(22, 'Buenos Aires', 1),
(23, 'TucumÃ¡n', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE IF NOT EXISTS `usuario` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `id_persona` int(11) NOT NULL,
  `contraseña` varchar(45) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  KEY `fk_Usuario_Personas1_idx` (`id_persona`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `curso`
--
ALTER TABLE `curso`
  ADD CONSTRAINT `#id_curso_orientacion` FOREIGN KEY (`id_orientacion`) REFERENCES `carrera` (`id_carrera`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `empleado`
--
ALTER TABLE `empleado`
  ADD CONSTRAINT `#id_persona` FOREIGN KEY (`id_persona`) REFERENCES `persona` (`id_persona`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `localidad`
--
ALTER TABLE `localidad`
  ADD CONSTRAINT `#id_localidad_provincia` FOREIGN KEY (`id_provincia`) REFERENCES `provincia` (`id_provincia`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `materia`
--
ALTER TABLE `materia`
  ADD CONSTRAINT `#id_materia_orientacion` FOREIGN KEY (`id_orientacion`) REFERENCES `carrera` (`id_carrera`) ON DELETE NO ACTION ON UPDATE NO ACTION;

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
