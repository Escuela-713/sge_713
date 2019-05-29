<?php
require_once "db_carrera.php";
require_once ("conexion.php");

if(!empty($_POST['delete_id']))
{
	$id=intval($_POST['delete_id']);
	
	$obj= new carrera();
	$query = $obj->eliminar_carrera($id);
}
elseif (intval($_POST['id']==0)  )
{
	$name = mysqli_real_escape_string($con,(strip_tags($_POST["name"],ENT_QUOTES)));
	$estado=(int) $_POST["estado_id"];
	$plan=(int) $_POST["plan"];

	$obj=new carrera();
	$query=$obj->nuevo_carrera($name,$estado,$plan);
} 
elseif (intval($_POST['id'])!=0)
{
	$name = mysqli_real_escape_string($con,(strip_tags($_POST["name"],ENT_QUOTES)));
	$estado=(int) $_POST["estado_id"];
	$plan=(int) $_POST["plan"];
	$id=(int) $_POST["id"];
	
	$obj=new carrera();
	$query=$obj->modificar_carrera($id, $name,$estado,$plan);
} 
else 
{
	$errors[] = "desconocido.";
}

if ($query) 
{
	$messages[] = "El registro ha sido guardado con éxito.";
} 
else 
{
	$errors[] = "Lo sentimos, el registro falló. Por favor, regrese y vuelva a intentarlo.". $query;
}

include("alerta.php");


?>			