<?php
require_once "db_cargo.php";
if (empty($_POST['edit_id']))
{
	$errors[] = "ID está vacío.";
} 
elseif (!empty($_POST['edit_id']))
{
	require_once ("conexion.php");//Contiene funcion que conecta a la base de datos
	
	$name = mysqli_real_escape_string($con,(strip_tags($_POST["edit_name"],ENT_QUOTES)));
	$descripcion=mysqli_real_escape_string($con,(strip_tags($_POST["edit_descripcion"],ENT_QUOTES)));
	
	$id=intval($_POST['edit_id']);
	
	// UPDATE data into database
	$obj=new cargo();
	$query = $obj->modificar_cargo($id, $name, $descripcion);
	
    // if product has been added successfully
	if ($query) {
		$messages[] = "El registro ha sido actualizado con éxito.";
	} 
	else {
		$errors[] = "Lo sentimos, la actualización falló. Por favor, regrese y vuelva a intentarlo.";
	}
}	
else 
	{
		$errors[] = "desconocido.";
	}


include("alerta_abm.php");
?>			