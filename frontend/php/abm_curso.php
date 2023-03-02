<?php
require_once "cls_curso.php";
require_once ("conexion.php");

if(!empty($_POST['delete_id']))
{
	$id=intval($_POST['delete_id']);
	$objeto= new curso();
	$query=$objeto->eliminar_curso($id);
}
elseif (intval($_POST['id'])==0)
{
	$anio =intval($_POST["anio"]);
	$division = mysqli_real_escape_string($con,(strip_tags($_POST["division"],ENT_QUOTES)));

	$obj=new curso();
	$query =$obj->nuevo_curso($anio,$division);
} 
elseif (intval($_POST['id'])!=0)
{	
	$anio =intval($_POST["anio"]);
	$division = mysqli_real_escape_string($con,(strip_tags($_POST["division"],ENT_QUOTES)));
	$id=intval($_POST['id']);
	
	$obj=new curso();
	$query = $obj->modificar_curso($id, $año, $division);	
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