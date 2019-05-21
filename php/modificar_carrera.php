<?php
require_once "db_carrera.php";

if (empty($_POST['edit_name']) || empty($_POST['edit_id'])  )
{
	$errors[] = "Ingresa los datos.".$_POST['edit_name'].$_POST['edit_id'];
} 

elseif (!empty($_POST['edit_name']))
{
	
	require_once ("conexion.php");
	
	$orientacion_name = mysqli_real_escape_string($con,(strip_tags($_POST["edit_name"],ENT_QUOTES)));
	$orientacion_estado=(int) $_POST["edit_estado"];
	$orientacion_plan=(int) $_POST["edit_plan"];
	$orientacion_id=(int) $_POST["edit_id"];

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