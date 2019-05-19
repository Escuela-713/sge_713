<?php

class provincia 
{	
	private $sql;
	public  function obtener_provincias()
	{
		include("conexion.php");
		$sql= mysqli_query($con, "CALL obtener_provincias();");
		return $sql;	
	}

	public function obtener_provincias_por_pais($id_pais)
	{
		include("conexion.php");
		$sql= mysqli_query($con, "CALL obtener_provincia_x_pais(".$id_pais.");");
		return $sql;

	}
}
?>