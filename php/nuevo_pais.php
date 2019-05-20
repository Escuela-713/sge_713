<?php
	require_once "db_pais.php";
	//Valido que el usuario ingrese el valor del país
	if (empty($_POST['name']))
	{
		$errors[] = "Ingresa el nombre del Pais.";
	} 

	elseif (!empty($_POST['name']))
	{
	include ("conexion.php");
    $pais_name = mysqli_real_escape_string($con,(strip_tags($_POST["name"],ENT_QUOTES)));
	
	$obj=new pais();

    $query = $obj->nuevo_pais($pais_name);
	
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