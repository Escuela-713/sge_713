<?php

require_once "db_localidad.php";

if (empty($_POST['delete_id']))
{
	$errors[] = "Id vacío.";
} elseif (!empty($_POST['delete_id'])){
	
	$id_localidad=intval($_POST['delete_id']);
	
	$obj=new localidad();
	$query=$obj->eliminar_localidad($id_localidad);

	if ($query) {
		$messages[] = "El registro ha sido eliminado con éxito.";
	} else {
		$errors[] = "Lo sentimos, la eliminación falló. Por favor, regrese y vuelva a intentarlo.";
	}

} else 
{
	$errors[] = "desconocido.";
}
include("alerta_abm.php");
?>			