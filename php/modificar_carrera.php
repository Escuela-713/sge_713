<?php
require_once "db_carrera.php";

if (empty($_POST['name']) || empty($_POST['id'])  )
{
	$errors[] = "Ingresa los datos.";

} 

elseif (!empty($_POST['name']))
{
	
	require_once ("conexion.php");
	
	$orientacion_name = mysqli_real_escape_string($con,(strip_tags($_POST["name"],ENT_QUOTES)));
	$orientacion_estado=(int) $_POST["estado_id"];
	$orientacion_plan=(int) $_POST["plan"];
	$orientacion_id=(int) $_POST["id"];

	$obj=new carrera();
	$query=$obj->modificar_carrera($orientacion_id, $orientacion_name,$orientacion_estado,$orientacion_plan);

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