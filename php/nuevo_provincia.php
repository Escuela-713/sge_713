<?php
require_once "db_provincia.php";
if (empty($_POST['name']))
{
	$errors[] = "Ingresa el nombre de la Provincia.";
} 

elseif (!empty($_POST['name'] ))
{
	
	require_once ("conexion.php");//Contiene funcion que conecta a la base de datos
	
	$provincia_name = mysqli_real_escape_string($con,(strip_tags($_POST["name"],ENT_QUOTES)));
	$pais_id = intval($_POST["id_pais"]);
	
	// INSERT data into database
	$obj=new provincia();
	$query = $obj->nuevo_provincia($provincia_name,$pais_id);
	
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