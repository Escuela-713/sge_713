<?php
require_once "db_provincia.php";

if (empty($_POST['id'])){
	$errors[] = "ID está vacío.";
} 
elseif (empty ($_POST['name']))
{
	$errors[] = "Nombre está vacío.";
}

elseif (!empty($_POST['id'])){
	require_once ("conexion.php");
	
	$name = mysqli_real_escape_string($con,(strip_tags($_POST["name"],ENT_QUOTES)));
	
	$id=intval($_POST['id']);

	$id_pais=intval($_POST['id_pais']);
	
	// UPDATE data into database
	$obj=new provincia();
	$query=$obj->modificar_provincia($id,$name,$id_pais);   
	
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