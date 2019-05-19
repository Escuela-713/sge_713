<?php

class pais 
{	
	private $sql;
	public  function obtener_paises(){
	include("conexion.php");
	$sql= mysqli_query($con, "CALL obtener_paises();");
	return $sql;	
	}
	
}
?>