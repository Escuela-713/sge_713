<?php
require_once "db_carrera.php";
if (empty($_POST['delete_id']))
{
	$errors[] = "Id vacío.";
} 
elseif (!empty($_POST['delete_id'])){
	require_once ("conexion.php");
	$id_carrera=intval($_POST['delete_id']);
	
	$obj= new carrera();
	$query = $obj->eliminar_carrera($id_carrera);

	if ($query) {
		$messages[] = "El registro ha sido eliminado con éxito.";
	} else {
		$errors[] = "Lo sentimos, la eliminación falló. Por favor, regrese y vuelva a intentarlo.";
	}
	
} else 
{
	$errors[] = "desconocido.";
}

include ("alerta_abm.php");
?>			