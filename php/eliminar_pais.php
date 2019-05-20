<?php
	if (empty($_POST['delete_id'])){
		$errors[] = "Id vacío.";
	} elseif (!empty($_POST['delete_id'])){
	require_once ("conexion.php");//Contiene funcion que conecta a la base de datos
	
    $id_pais=intval($_POST['delete_id']);
	
	// DELETE FROM  database
    require_once "db_pais.php";
    $obj=new pais();
    $query=$obj->eliminar_pais($id_pais);
    // if product has been added successfully
    if ($query) {
        $messages[] = "El registro ha sido eliminado con éxito.";
    } else {
        $errors[] = "Lo sentimos, la eliminación falló. Por favor, regrese y vuelva a intentarlo.";
    }
		
	} else 
	{
		$errors[] = "desconocido.";
	}
include("alerta_abm.php");
?>			