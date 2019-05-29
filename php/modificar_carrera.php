<?php
require_once "db_carrera.php";
require_once ("conexion.php");
$name = mysqli_real_escape_string($con,(strip_tags($_POST["name"],ENT_QUOTES)));
$estado=(int) $_POST["estado_id"];
$plan=(int) $_POST["plan"];

if (intval($_POST['id']==0)  )
{
	$obj=new carrera();
	$query=$obj->nuevo_carrera($name,$estado,$plan);
} 

elseif (intval($_POST['id'])!=0)
{
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

include("alerta_abm.php");


?>			