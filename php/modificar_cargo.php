<?php
require_once "db_cargo.php";
require_once ("conexion.php");
$cargo_name = mysqli_real_escape_string($con,(strip_tags($_POST["nombre"],ENT_QUOTES)));
$cargo_descripcion = mysqli_real_escape_string($con,(strip_tags($_POST["descripcion"],ENT_QUOTES)));

if (intval($_POST['id'])==0)
{
	$obj=new cargo();
	$query =$obj->nuevo_cargo($cargo_name,$cargo_descripcion);
} 
elseif (intval($_POST['id'])!=0)
{	
	$id=intval($_POST['id']);
	$obj=new cargo();
	$query = $obj->modificar_cargo($id, $cargo_name, $cargo_descripcion);	
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

include("alerta_abm.php");
?>			