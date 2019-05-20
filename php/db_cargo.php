<?php

class cargo
{	
	private $sql;
	public  function obtener_cargos()
	{
		include("conexion.php");
		$sql= mysqli_query($con, "CALL obtener_cargos();");
		return $sql;	
	}

	public function eliminar_cargo($id)
	{
		include("conexion.php");
		$sql = mysqli_query($con,"call eliminar_cargo(".$id.")");
	    return $sql;
	}

	public function modificar_cargo($id,$nombre,$descripcion)
	{
		include("conexion.php");
		$sql = mysqli_query($con,"call modificar_cargo(".$id.",'".$nombre."','".$descripcion."')");
		return $sql;

	}

	public function nuevo_cargo($nombre,$descripcion)
	{
		include("conexion.php");
		$sql = mysqli_query($con,"call nuevo_cargo('".$nombre."','".$descripcion."')");
		return $sql;

	}
}
?>