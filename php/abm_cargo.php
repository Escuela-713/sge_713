<?php
require_once "db_cargo.php";
require_once ("conexion.php");

if(!empty($_POST['delete_id']))
{
	$id=intval($_POST['delete_id']);
	$objeto= new cargo();
	$query=$objeto->eliminar_cargo($id);
}
elseif (intval($_POST['id'])==0)
{
	$name = mysqli_real_escape_string($con,(strip_tags($_POST["nombre"],ENT_QUOTES)));
	$descripcion = mysqli_real_escape_string($con,(strip_tags($_POST["descripcion"],ENT_QUOTES)));

	$obj=new cargo();
	$query =$obj->nuevo_cargo($name,$descripcion);
} 
elseif (intval($_POST['id'])!=0)
{	
	$name = mysqli_real_escape_string($con,(strip_tags($_POST["nombre"],ENT_QUOTES)));
	$descripcion = mysqli_real_escape_string($con,(strip_tags($_POST["descripcion"],ENT_QUOTES)));
	$id=intval($_POST['id']);
	
	$obj=new cargo();
	$query = $obj->modificar_cargo($id, $name, $descripcion);	
}	
else 
{
	$errors[] = "desconocido.";
}

if ($query) 
{
	$messages[] = "El registro ha sido actualizado con éxito.";
} 
else {
	$errors[] = "Lo sentimos, la actualización falló. Por favor, regrese y vuelva a intentarlo.";
}

include("alerta.php");
?>			