<?php

class carrera
{	
	private $sql;
	public  function obtener_carreras()
	{
		include("conexion.php");
		$sql= mysqli_query($con, "CALL obtener_carreras();");
		return $sql;	
	}

	public function eliminar_carrera($id)
	{
		include("conexion.php");
		$sql = mysqli_query($con,"call eliminar_carrera(".$id.")");
	    return $sql;
	}

	public function modificar_carrera($id,$nombre,$estado, $titulo_egreso)
	{
		include("conexion.php");
		$sql = mysqli_query($con,"call modificar_carrera('".$nombre."',".$estado.",".$titulo_egreso.",".$id.")");
		return $sql;
	}

	public function nuevo_carrera($nombre,$estado, $titulo_egreso)
	{
		include("conexion.php");
		$sql = mysqli_query($con,"call nuevo_carrera('".$nombre."',".$estado.",".$titulo_egreso.")");
		return $sql;

	}
}
?>