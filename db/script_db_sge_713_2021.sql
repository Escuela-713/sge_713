-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET latin1 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`alumno`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`alumno` (
  `id_alumno` INT(11) NOT NULL AUTO_INCREMENT,
  `legajo` INT(11) NULL DEFAULT NULL,
  `fecha_ingreso` DATE NULL DEFAULT NULL,
  `id_persona` INT(11) NOT NULL,
  `id_curso` INT(11) NULL DEFAULT NULL,
  `esc_origen` VARCHAR(45) NOT NULL,
  `proyecto` VARCHAR(45) NULL DEFAULT NULL,
  `n_libro_matriz` INT(5) NULL DEFAULT NULL,
  `certif_primaria` VARCHAR(60) NULL DEFAULT NULL,
  `tutor` VARCHAR(60) NOT NULL,
  `telefono_tutor` VARCHAR(20) NOT NULL,
  `n_folio` INT(3) NULL DEFAULT NULL,
  PRIMARY KEY (`id_alumno`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`alumno_x_plan`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`alumno_x_plan` (
  `id_alumno` INT(11) NOT NULL,
  `id_plan` VARCHAR(45) NOT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`cargo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`cargo` (
  `id_cargo` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `descripcion` VARCHAR(150) NULL DEFAULT NULL,
  PRIMARY KEY (`id_cargo`))
ENGINE = InnoDB
AUTO_INCREMENT = 11
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`carrera`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`carrera` (
  `id_carrera` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `estado` TINYINT(1) NOT NULL,
  `titulo_egreso` VARCHAR(125) NOT NULL,
  PRIMARY KEY (`id_carrera`))
ENGINE = InnoDB
AUTO_INCREMENT = 13
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`curso`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`curso` (
  `id_curso` INT(11) NOT NULL AUTO_INCREMENT,
  `anio` SMALLINT(4) NOT NULL,
  `division` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`id_curso`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`estado_civil`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`estado_civil` (
  `id_estado_civil` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_estado_civil`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`instancia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`instancia` (
  `id_instancia` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`id_instancia`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`localidad`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`localidad` (
  `id_localidad` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `codigo_postal` SMALLINT(5) UNSIGNED NULL DEFAULT NULL,
  `id_provincia` INT(11) NOT NULL,
  PRIMARY KEY (`id_localidad`))
ENGINE = InnoDB
AUTO_INCREMENT = 20
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`materia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`materia` (
  `id_materia` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `descripcion` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_materia`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`materia_x_plan`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`materia_x_plan` (
  `anio` SMALLINT(4) NOT NULL,
  `id_materia` INT(11) NOT NULL,
  `id_plan` INT(11) NOT NULL,
  `hs_semanales` SMALLINT(2) NOT NULL,
  `hs_anual` SMALLINT(2) NOT NULL,
  PRIMARY KEY (`id_materia`, `id_plan`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`pais`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`pais` (
  `id_pais` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_pais`))
ENGINE = InnoDB
AUTO_INCREMENT = 24
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`persona`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`persona` (
  `id_persona` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `apellido` VARCHAR(45) NOT NULL,
  `sexo` VARCHAR(1) NULL DEFAULT NULL,
  `fecha_nacimiento` DATE NOT NULL,
  `id_estado_civil` INT(11) NOT NULL,
  `dni` INT(11) UNSIGNED NOT NULL,
  `grupo sanguineo` CHAR(2) NULL DEFAULT NULL,
  `calle` VARCHAR(45) NOT NULL,
  `numero` SMALLINT(4) NOT NULL,
  `barrio` VARCHAR(45) NOT NULL,
  `telefono` VARCHAR(14) NOT NULL,
  `id_localidad` INT(11) NOT NULL,
  `id_localidad_nacimiento` INT(11) NOT NULL,
  `contacto` VARCHAR(45) NOT NULL,
  `id_alumno` INT(11) NOT NULL,
  PRIMARY KEY (`id_persona`))
ENGINE = InnoDB
AUTO_INCREMENT = 14
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`plan`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`plan` (
  `id_plan` INT(11) NOT NULL AUTO_INCREMENT,
  `id_carrera` INT(11) NOT NULL,
  `plan` SMALLINT(2) NOT NULL,
  `estado` TINYINT(1) NOT NULL,
  `horas_catedra` TINYINT(2) NOT NULL,
  `horas_reloj` TINYINT(2) NOT NULL,
  PRIMARY KEY (`id_plan`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`profesor_x_materia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`profesor_x_materia` (
  `id_materia` VARCHAR(45) NOT NULL,
  `id_empleado` INT(11) NOT NULL,
  PRIMARY KEY (`id_materia`, `id_empleado`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`provincia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`provincia` (
  `id_provincia` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `id_pais` INT(11) NOT NULL,
  PRIMARY KEY (`id_provincia`))
ENGINE = InnoDB
AUTO_INCREMENT = 28
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`trayectoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`trayectoria` (
  `notas` VARCHAR(45) NOT NULL,
  `observacion` VARCHAR(50) NOT NULL,
  `fecha` DATE NOT NULL,
  `id_curso` INT(11) NOT NULL,
  `id_alumno` INT(11) NOT NULL,
  `id_materia` INT(11) NOT NULL,
  `id_instancia` INT(11) NOT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`tutor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`tutor` (
  `id_tutor` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL DEFAULT NULL,
  `apellido` VARCHAR(45) NULL DEFAULT NULL,
  `id_localidad` INT(11) NULL DEFAULT NULL,
  `id_genero` INT(11) NULL DEFAULT NULL,
  `id_estado_civil` INT(11) NULL DEFAULT NULL,
  `telefono` VARCHAR(45) NULL DEFAULT NULL,
  `domicilio` VARCHAR(45) NULL DEFAULT NULL,
  `fecha_nacimiento` DATE NULL DEFAULT NULL,
  `profesion` VARCHAR(45) NULL DEFAULT NULL,
  `tel_trabajo` VARCHAR(45) NULL DEFAULT NULL,
  `email` VARCHAR(45) NULL DEFAULT NULL,
  `id_alumno` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id_tutor`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `mydb`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`usuario` (
  `id_usuario` INT(11) NOT NULL AUTO_INCREMENT,
  `id_persona` INT(11) NOT NULL,
  `contraseña` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_usuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

USE `mydb` ;

-- -----------------------------------------------------
-- procedure eliminar_cargo
-- -----------------------------------------------------

DELIMITER $$
USE `mydb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminar_cargo`(IN `p_id` INT)
BEGIN
delete from cargo
where id_cargo=p_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure eliminar_carrera
-- -----------------------------------------------------

DELIMITER $$
USE `mydb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminar_carrera`(IN `p_id` INT(11))
BEGIN
DELETE FROM carrera WHERE id_carrera=p_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure eliminar_curso
-- -----------------------------------------------------

DELIMITER $$
USE `mydb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminar_curso`(IN `p_id_curso` INT(11))
BEGIN
delete 
from curso
where id_curso=p_id_curso;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure eliminar_empleado
-- -----------------------------------------------------

DELIMITER $$
USE `mydb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminar_empleado`(IN `p_id` INT(11))
BEGIN
DELETE FROM empleado_x_cargo where id_empleado=p_id;
DELETE FROM persona where id_persona = (select id_persona from empleado where id_empleado=p_id);
DELETE FROM empleado WHERE id_empleado=p_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure eliminar_instancia
-- -----------------------------------------------------

DELIMITER $$
USE `mydb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminar_instancia`(IN `p_id_instancia` INT(11))
BEGIN
delete 
from instancia
where id_instancia=p_id_instancia;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure eliminar_localidad
-- -----------------------------------------------------

DELIMITER $$
USE `mydb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminar_localidad`(IN `p_id` INT)
BEGIN
delete from localidad
where id_localidad=p_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure eliminar_materia
-- -----------------------------------------------------

DELIMITER $$
USE `mydb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminar_materia`(IN `p_id_materia` INT(11))
BEGIN
delete 
from materia
where id_materia=p_id_materia;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure eliminar_materia_x_plan
-- -----------------------------------------------------

DELIMITER $$
USE `mydb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminar_materia_x_plan`(IN `p_id_materia` INT(11), `p_id_plan` INT(11))
BEGIN
delete 
from materia_x_plan
where id_materia=p_id_materia and id_plan=p_id_plan;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure eliminar_pais
-- -----------------------------------------------------

DELIMITER $$
USE `mydb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminar_pais`(IN `p_id` INT(11))
BEGIN
DELETE FROM pais WHERE id_pais=p_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure eliminar_plan
-- -----------------------------------------------------

DELIMITER $$
USE `mydb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminar_plan`(IN `p_id_plan` INT(11))
BEGIN
delete 
from plan
where id_plan=p_id_plan;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure eliminar_provincia
-- -----------------------------------------------------

DELIMITER $$
USE `mydb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminar_provincia`(IN `p_id` INT(11))
BEGIN
DELETE FROM provincia WHERE id_provincia=p_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure modificar_cargo
-- -----------------------------------------------------

DELIMITER $$
USE `mydb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `modificar_cargo`(IN `p_id` INT, `p_nombre` VARCHAR(45), `p_descripcion` VARCHAR(150))
BEGIN
update cargo 
set nombre=p_nombre,
descripcion=p_descripcion
where id_cargo =p_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure modificar_carrera
-- -----------------------------------------------------

DELIMITER $$
USE `mydb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `modificar_carrera`(IN `p_nombre` VARCHAR(45), `p_estado` VARCHAR(45), `p_plan` VARCHAR(45), `p_titulo_egreso` VARCHAR(120))
BEGIN
UPDATE carrera SET nombre=p_nombre, estado=p_estado, plan=p_titulo_egreso
WHERE id_carrera=p_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure modificar_curso
-- -----------------------------------------------------

DELIMITER $$
USE `mydb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `modificar_curso`(IN `p_anio` SMALLINT(4), `p_division` VARCHAR(15))
BEGIN
UPDATE curso
SET

anio= p_anio,
division = p_division
WHERE id_curso=p_id;

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure modificar_empleado
-- -----------------------------------------------------

DELIMITER $$
USE `mydb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `modificar_empleado`(IN `p_id` INT(11), `p_nombre` VARCHAR(45), `p_apellido` VARCHAR(45), `p_sexo` VARCHAR(2), `p_fecha_nacimiento` DATE, `p_estado_civil` INT(11), `p_dni` INT(9), `p_calle` VARCHAR(45), `p_numero` SMALLINT(4), `p_barrio` VARCHAR(45), `p_telefono` VARCHAR(14), `p_id_localidad_residencia` INT(11), `p_fecha_de_ingreso` DATE, `p_legajo` INT(11), `p_id_cargo` INT(11), `p_id_localidad_nacimiento` INT(11))
BEGIN

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

DELIMITER ;

-- -----------------------------------------------------
-- procedure modificar_instancia
-- -----------------------------------------------------

DELIMITER $$
USE `mydb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `modificar_instancia`(IN `p_nombre` VARCHAR(30))
BEGIN
UPDATE instancia 
SET nombre=p_nombre
WHERE id_instancia=p_id;

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure modificar_localidad
-- -----------------------------------------------------

DELIMITER $$
USE `mydb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `modificar_localidad`(IN `p_nombre` VARCHAR(45), `p_id` INT(11), `p_id_provincia` INT(11), `p_codigo_postal` INT(11))
BEGIN
UPDATE localidad SET nombre=p_nombre, id_provincia=p_id_provincia, codigo_postal=p_codigo_postal
WHERE id_localidad=p_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure modificar_materia
-- -----------------------------------------------------

DELIMITER $$
USE `mydb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `modificar_materia`(IN `p_id` INT, `p_nombre` VARCHAR(45), `p_descripcion` VARCHAR(45))
BEGIN
UPDATE materia
SET nombre=p_nombre,
descripcion=p_descripcion
WHERE id_materia=p_id;

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure modificar_materia_x_plan
-- -----------------------------------------------------

DELIMITER $$
USE `mydb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `modificar_materia_x_plan`(IN `p_anio` SMALLINT(4), `p_hs_semanales` SMALLINT(2), `p_hs_anual` SMALLINT(4))
BEGIN
UPDATE materia_x_plan
SET anio = p_anio,
hs_semanales = p_hs_semanales,
hs_anual = p_hs_anual
WHERE id_materia_x_plan=p_id and
id_plan=p_id and
id_materia=p_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure modificar_pais
-- -----------------------------------------------------

DELIMITER $$
USE `mydb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `modificar_pais`(IN `p_nombre` VARCHAR(40), IN `p_id` INT(11))
BEGIN

UPDATE pais SET nombre=p_nombre
WHERE id_pais=p_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure modificar_plan
-- -----------------------------------------------------

DELIMITER $$
USE `mydb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `modificar_plan`(IN `p_plan` SMALLINT(2), `p_estado` TINYINT(1), `p_horas_catedra` TINYINT(2), `p_horas_reloj` TINYINT(2))
BEGIN
UPDATE plan
SET
plan=p_plan,
estado=p_estado,
horas_catedra =p_horas_catedra,
horas_reloj = p_horas_reloj
WHERE id_plan = p_id and id_carrera=p_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure modificar_provincia
-- -----------------------------------------------------

DELIMITER $$
USE `mydb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `modificar_provincia`(IN `p_nombre` VARCHAR(45), `p_id` INT(11), `p_id_pais` INT(11))
BEGIN
UPDATE provincia SET nombre=p_nombre,id_pais=p_id_pais
WHERE id_provincia=p_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure nuevo_cargo
-- -----------------------------------------------------

DELIMITER $$
USE `mydb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `nuevo_cargo`(IN `p_nombre` VARCHAR(40), `p_descripcion` VARCHAR(150))
BEGIN
INSERT INTO cargo (nombre, descripcion) VALUES (p_nombre, p_descripcion);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure nuevo_carrera
-- -----------------------------------------------------

DELIMITER $$
USE `mydb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `nuevo_carrera`(IN `p_nombre` VARCHAR(45), `p_estado` TINYINT(1), `p_titulo_egreso` VARCHAR(125))
BEGIN
INSERT INTO `mydb`.`carrera`
(`nombre`,
`estado`,
`plan`)
VALUES
(`p_nombre`,
`p_estado`,
`p_titulo_egreso`);

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure nuevo_curso
-- -----------------------------------------------------

DELIMITER $$
USE `mydb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `nuevo_curso`(IN `p_anio` SMALLINT(11), `p_division` VARCHAR(15))
BEGIN
INSERT INTO `mydb`.`curso`
(
`anio`,
`division`)
VALUES
(
`p_anio`,
`p_division`);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure nuevo_empleado
-- -----------------------------------------------------

DELIMITER $$
USE `mydb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `nuevo_empleado`(IN `p_nombre` VARCHAR(45), `p_apellido` VARCHAR(45), `p_sexo` VARCHAR(2), `p_fecha_nacimiento` DATE, `p_estado_civil` INT(11), `p_dni` INT(11), `p_calle` VARCHAR(45), `p_numero` SMALLINT(5), `p_barrio` VARCHAR(45), `p_telefono` VARCHAR(14), `p_id_localidad_residencia` INT(11), `p_fecha_de_ingreso` DATE, `p_legajo` INT(12), `p_id_cargo` INT(11), `p_localidad_nacimiento` DATE)
BEGIN
INSERT INTO persona (nombre, apellido,sexo, fecha_nacimiento, id_estado_civil, dni, calle, numero, barrio, telefono, id_localidad_nacimiento, id_localidad) values (p_nombre, p_apellido,  p_sexo, p_fecha_nacimiento,p_estado_civil, p_dni,p_calle,p_numero,p_barrio,p_telefono,p_localidad_nacimiento, p_id_localidad_residencia);
INSERT INTO empleado (fecha_de_ingreso, legajo,id_persona) values (p_fecha_de_ingreso, p_legajo, LAST_INSERT_ID());
INSERT INTO empleado_x_cargo (id_empleado, id_cargo) values (LAST_INSERT_ID(), p_id_cargo);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure nuevo_instancia
-- -----------------------------------------------------

DELIMITER $$
USE `mydb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `nuevo_instancia`(IN `p_nombre` VARCHAR(30))
BEGIN
INSERT INTO `mydb`.`instancia`
(`nombre`)
VALUES
(`p_nombre`);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure nuevo_localidad
-- -----------------------------------------------------

DELIMITER $$
USE `mydb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `nuevo_localidad`(IN `p_nombre` VARCHAR(40), `p_codigo_postal` INT(11), `p_id_provincia` INT(11))
BEGIN
INSERT INTO localidad (nombre, codigo_postal, id_provincia) values (p_nombre, p_codigo_postal, p_id_provincia);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure nuevo_materia
-- -----------------------------------------------------

DELIMITER $$
USE `mydb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `nuevo_materia`(IN `p_nombre` VARCHAR(45), `p_descripcion` VARCHAR(45))
BEGIN
INSERT INTO `mydb`.`materia`
(`nombre`,
`descripcion`)
VALUES
(`p_nombre`,
`p_descripcion`);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure nuevo_materia_x_plan
-- -----------------------------------------------------

DELIMITER $$
USE `mydb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `nuevo_materia_x_plan`(`p_anio` SMALLINT(4), `p_hs_semanales` SMALLINT(2), `p_hs_anual` SMALLINT(2))
BEGIN
INSERT INTO `mydb`.`materia_x_plan`
(`anio`,
`hs_semanales`,
`hs_anual`)
VALUES
(`p_anio`,
`p_hs_semanales`,
`p_hs_anual`);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure nuevo_pais
-- -----------------------------------------------------

DELIMITER $$
USE `mydb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `nuevo_pais`(IN `p_nombre` VARCHAR(40))
BEGIN
INSERT INTO pais (nombre) VALUES (p_nombre);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure nuevo_plan
-- -----------------------------------------------------

DELIMITER $$
USE `mydb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `nuevo_plan`(IN `p_plan` SMALLINT(2), `p_estado` TINYINT(1), `p_horas_catedra` TINYINT(2), `p_horas_reloj` TINYINT(2))
BEGIN
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

DELIMITER ;

-- -----------------------------------------------------
-- procedure nuevo_provincia
-- -----------------------------------------------------

DELIMITER $$
USE `mydb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `nuevo_provincia`(IN `p_nombre` VARCHAR(40), `p_id_pais` INT(11))
BEGIN
insert into provincia (nombre, id_pais) values (p_nombre, p_id_pais);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure obtener_cargos
-- -----------------------------------------------------

DELIMITER $$
USE `mydb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `obtener_cargos`()
BEGIN
select * from cargo 
order by nombre;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure obtener_carreras
-- -----------------------------------------------------

DELIMITER $$
USE `mydb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `obtener_carreras`()
BEGIN
SELECT id_carrera, nombre, estado, titulo_egreso
FROM carrera 
ORDER BY nombre ASC;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure obtener_cursos
-- -----------------------------------------------------

DELIMITER $$
USE `mydb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `obtener_cursos`()
BEGIN
select id_curso, division, anio from curso;

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure obtener_empleado
-- -----------------------------------------------------

DELIMITER $$
USE `mydb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `obtener_empleado`(IN `p_id` INT(11))
BEGIN
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

DELIMITER ;

-- -----------------------------------------------------
-- procedure obtener_empleados
-- -----------------------------------------------------

DELIMITER $$
USE `mydb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `obtener_empleados`()
BEGIN
SELECT  e.id_empleado, e.fecha_de_ingreso, e.legajo, c.id_cargo, c.nombre as cargo,  p.nombre, p.apellido, p.dni, p.telefono
FROM empleado_x_cargo ec 
INNER JOIN empleado e ON e.id_empleado=ec.id_empleado
INNER JOIN persona p ON p.id_persona=e.id_persona
LEFT JOIN cargo c ON c.id_cargo=ec.id_cargo
ORDER BY p.nombre ASC;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure obtener_empleados_x_cargo
-- -----------------------------------------------------

DELIMITER $$
USE `mydb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `obtener_empleados_x_cargo`(IN `pid_cargo` INT(11))
BEGIN
SELECT e.fecha_de_ingreso, e.legajo, c.nombre, c.descripcion, p.nombre, p.apellido, p.sexo, p.fecha_nacimiento, p.estado_civil, p.estado_civil, p.dni, p.calle, p.numero, p.barrio, p.telefono, p.localidad
FROM empleado_x_cargo ec 
INNER JOIN empleado e ON e.id_empleado=ec.id_empleado
INNER JOIN persona p ON p.id_persona=e.id_persona
INNER JOIN cargo c ON c.id_cargo=ec.id_cargo
ORDER BY p.nombre ASC;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure obtener_estados_civil
-- -----------------------------------------------------

DELIMITER $$
USE `mydb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `obtener_estados_civil`()
BEGIN
SELECT id_estado_civil, nombre
from estado_civil
ORDER BY nombre ASC;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure obtener_instancias
-- -----------------------------------------------------

DELIMITER $$
USE `mydb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `obtener_instancias`()
BEGIN
select id_instancia, nombre from instancia
order by nombre;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure obtener_localidades
-- -----------------------------------------------------

DELIMITER $$
USE `mydb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `obtener_localidades`()
BEGIN
SELECT l.id_localidad, l.nombre, l.codigo_postal, p.nombre as provincia, p.id_provincia, pa.id_pais, pa.nombre as pais FROM localidad l
inner join provincia p on p.id_provincia=l.id_provincia
inner join pais pa on p.id_pais=pa.id_pais
order by l.nombre;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure obtener_localidades_x_provincia
-- -----------------------------------------------------

DELIMITER $$
USE `mydb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `obtener_localidades_x_provincia`(IN `pid_provincia` INT(11))
BEGIN
SELECT l.id_localidad, l.nombre, l.codigo_postal, l.id_provincia  
FROM localidad l
WHERE id_provincia = pid_provincia ORDER BY nombre ASC;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure obtener_materias
-- -----------------------------------------------------

DELIMITER $$
USE `mydb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `obtener_materias`()
BEGIN
select id_materia, nombre, descripcion from materia
order by nombre;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure obtener_paises
-- -----------------------------------------------------

DELIMITER $$
USE `mydb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `obtener_paises`()
BEGIN
  SELECT id_pais, nombre FROM mydb.pais ORDER BY nombre ASC;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure obtener_planes
-- -----------------------------------------------------

DELIMITER $$
USE `mydb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `obtener_planes`()
BEGIN
select p.id_plan, car.id_carrera, p.plan, p.estado, p.horas_catedra, p.horas_reloj, car.nombre as carrera 
from carrera car
inner join plan p on p.id_carrera=car.id_carrera
order by nombre;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure obtener_provincia_x_pais
-- -----------------------------------------------------

DELIMITER $$
USE `mydb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `obtener_provincia_x_pais`(IN `pid_pais` INT(11))
BEGIN

SELECT p.id_provincia, p.nombre , pa.id_pais, pa.nombre as nombre_pais FROM provincia p
inner join pais pa on pa.id_pais=p.id_pais 
WHERE p.id_pais = pid_pais ORDER BY p.nombre ASC;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure obtener_provincias
-- -----------------------------------------------------

DELIMITER $$
USE `mydb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `obtener_provincias`()
BEGIN

SELECT p.id_provincia, p.nombre , pa.nombre as pais, pa.id_pais FROM provincia p
inner join pais pa on pa.id_pais=p.id_pais 
ORDER BY p.nombre ASC;
END$$

DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
