<?php
	//Valido que el usuario ingrese el valor del país
require_once "db_localidad.php";

if (empty($_POST['name'] ))
{
	$errors[] = "Nombre vacío";
} 

elseif (!empty($_POST['name'] && $_POST['id_provincia']))
{
	require_once ("conexion.php");
	$localidad_name = mysqli_real_escape_string($con,(strip_tags($_POST["name"],ENT_QUOTES)));
	$localidad_cp=intval($_POST["cp"]);
	$localidad_id_provincia=intval($_POST["id_provincia"]);
	
	// INSERT data into database
	$obj=new localidad();
	$query=$obj->nuevo_localidad($localidad_name,$localidad_cp,$localidad_id_provincia);
    // if product has been added successfully
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
