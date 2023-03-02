<?php

class instancia
{	
	private $sql;
	public  function obtener_instancias()
	{
		include("conexion.php");
		$sql= mysqli_query($con, "CALL obtener_instancias();");
		return $sql;	
	}

	public function eliminar_instancia($id)
	{
		include("conexion.php");
		$sql = mysqli_query($con,"call eliminar_instancia(".$id.")");
	    return $sql;
	}

	public function modificar_instancia($id,$nombre)
	{
		include("conexion.php");
		$sql = mysqli_query($con,"call modificar_instancia(".$id.",'".$nombre."')");
		return $sql;

	}

	public function nuevo_instancia($nombre)
	{
		include("conexion.php");
		$sql = mysqli_query($con,"call nuevo_instancia('".$nombre."')");
		return $sql;

	}
}
?>