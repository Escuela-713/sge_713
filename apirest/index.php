<?php
require_once "controladores/rutas.controlador.php";
require_once "modelos/conexion.php";

$index = new RutasControlador();
$index -> index();

?>