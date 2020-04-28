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
	$name = mysqli_real_escape_string($con,(strip_tags($_POST["nombre"],ENT_QUOTES)));
	$anio =intval($_POST["anio"]);
	$división = mysqli_real_escape_string($con,(strip_tags($_POST["division"],ENT_QUOTES)));

	$obj=new cargo();
	$query =$obj->nuevo_cargo($name,$año,$división);
} 
elseif (intval($_POST['id'])!=0)
{	
	$name = mysqli_real_escape_string($con,(strip_tags($_POST["nombre"],ENT_QUOTES)));
	$anio =intval($_POST["anio"]);
	$división = mysqli_real_escape_string($con,(strip_tags($_POST["division"],ENT_QUOTES)));
	$id=intval($_POST['id']);
	
	$obj=new curso();
	$query = $obj->modificar_curso($id, $name, $año, $división);	
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