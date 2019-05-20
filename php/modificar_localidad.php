<?php
require_once "db_localidad.php";
include("conexion.php");

if (empty($_POST['edit_id'])){
	$errors[] = "ID está vacío.";
} 
elseif (empty ($_POST['edit_name']))
{
	$errors[] = "Nombre está vacío.";
}
elseif (!empty($_POST['edit_id'])){
	
	require_once ("conexion.php");
	$name = mysqli_real_escape_string($con,(strip_tags($_POST["edit_name"],ENT_QUOTES)));
	
	$id=intval($_POST['edit_id']);

	$id_provincia=intval($_POST['id_provincia_m']);

	$cp=intval($_POST['edit_cp']);
	
	$obj=new localidad();
	$query=$obj->modificar_localidad($id,$name,$cp,$id_provincia);
    // if product has been added successfully
	if ($query) {
		$messages[] = "El registro ha sido actualizado con éxito.";
	} else {
		$errors[] = "Lo sentimos, la actualización falló. Por favor, regrese y vuelva a intentarlo.";
	}

} else 
{
	$errors[] = "desconocido.";
}
include("alerta_abm.php");
?>			