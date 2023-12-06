CREATE TABLE IF NOT EXISTS `mydb`.`asistencia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` date DEFAULT NULL,
  `id_alumno` int(11) DEFAULT NULL,
  `alumno_asistio` tinyint(1) DEFAULT NULL,
  `id_tipo_falta` int(11) DEFAULT NULL,
  `observaciones` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
)
AUTO_INCREMENT = 1
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `mydb`.`tipo_asistencia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) DEFAULT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
)
AUTO_INCREMENT = 1
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;