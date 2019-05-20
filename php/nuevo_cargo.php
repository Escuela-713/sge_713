<?php
require_once "db_cargo.php";
if (empty($_POST['nombre'] ))
{
	$errors[] = "Ingresa el nombre del Cargo.";
} 

elseif (!empty($_POST['nombre'] ))
{
	
	require_once ("conexion.php");//Contiene funcion que conecta a la base de datos
	
	$cargo_name = mysqli_real_escape_string($con,(strip_tags($_POST["nombre"],ENT_QUOTES)));
	$cargo_descripcion = mysqli_real_escape_string($con,(strip_tags($_POST["descripcion"],ENT_QUOTES)));
	
	// INSERT data into database
	$obj=new cargo();
	$query =$obj->nuevo_cargo($cargo_name,$cargo_descripcion);
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