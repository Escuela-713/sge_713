<?php
include("db_provincia.php");

if (empty($_POST['delete_id'])){
	$errors[] = "Id vacío.";
} elseif (!empty($_POST['delete_id'])){
	
	
	$id_provincia=intval($_POST['delete_id']);
	
	// DELETE FROM  database
	$obj=new provincia();
	$query=$obj->eliminar_provincia($id_provincia);
   
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