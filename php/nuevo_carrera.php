<?php
require_once "db_carrera.php";

if (empty($_POST['name']))
{
	$errors[] = "Ingresa los datos.";
} 

elseif (!empty($_POST['name']))
{
	
	require_once ("conexion.php");
	
	$name = mysqli_real_escape_string($con,(strip_tags($_POST["name"],ENT_QUOTES)));
	$estado=(int) $_POST["estado_id"];
	$plan=(int) $_POST["plan"];

	$obj=new carrera();
	$query=$obj->nuevo_carrera($name,$estado,$plan);

	if ($query) 
	{
		$messages[] = "El registro ha sido guardado con éxito.";
	} 
	else 
	{
		$errors[] = "Lo sentimos, el registro falló. Por favor, regrese y vuelva a intentarlo.". $query;
	}

} 

else 
{
	$errors[] = "desconocido.";
}

include("alerta_abm.php");


?>			