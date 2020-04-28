<?php
require_once "cls_materia.php";
include("conexion.php");

if(!empty($_POST['delete_id']))
{
	$id=intval($_POST['delete_id']);
	
	$obj=new materia();
	$query=$obj->eliminar_materia($id);
}
elseif (intval($_POST['id'])==0){
	$name = mysqli_real_escape_string($con,(strip_tags($_POST["name"],ENT_QUOTES)));
	$descripcion=mysqli_real_escape_string($con,(strip_tags($_POST["descripcion"],ENT_QUOTES)));
	

	$obj=new materia();
	$query=$obj->nuevo_materia($name,$descripcion);
} 
elseif (intval($_POST['id'])!=0){
	$name = mysqli_real_escape_string($con,(strip_tags($_POST["name"],ENT_QUOTES)));
	$descripcion=mysqli_real_escape_string($con,(strip_tags($_POST["descripcion"],ENT_QUOTES)));
	$id=intval($_POST['id']);	
	
	$obj=new materia();
	$query=$obj->modificar_materia($id,$name,$descripcion);
} else 
{
	$errors[] = "desconocido.";
}
if ($query) {
	$messages[] = "El registro ha sido actualizado con éxito.";
} else {
	$errors[] = "Lo sentimos, la actualización falló. Por favor, regrese y vuelva a intentarlo.";
}
include("alerta.php");
?>			