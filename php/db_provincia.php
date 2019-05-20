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

	public function eliminar_provincia($id)
	{
		include("conexion.php");
		$sql = mysqli_query($con,"call eliminar_provincia(".$id.")");
	    return $sql;
	}

	public function modificar_provincia($id,$nombre,$id_pais)
	{
		include("conexion.php");
		$sql = mysqli_query($con,"call modificar_provincia('".$nombre."',".$id.",".$id_pais.")");
		return $sql;

	}

	public function nuevo_provincia($nombre,$id_pais)
	{
		include("conexion.php");
		$sql = mysqli_query($con,"call nuevo_provincia('".$nombre."',".$id_pais.")");
		return $sql;

	}
}
?>