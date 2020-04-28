<?php

class materia
{	
	private $sql;
	public  function obtener_materias()
	{
		include("conexion.php");
		$sql= mysqli_query($con, "CALL obtener_materia();");
		return $sql;	
	}

	public function eliminar_materia($id)
	{
		include("conexion.php");
		$sql = mysqli_query($con,"call eliminar_materia(".$id.")");
	    return $sql;
	}

	public function modificar_materia($id,$nombre,$descripcion)
	{
		include("conexion.php");
		$sql = mysqli_query($con,"call modificar_materia(".$id.",'".$nombre."','".$descripcion."')");
		return $sql;

	}

	public function nuevo_materia($nombre,$descripcion)
	{
		include("conexion.php");
		$sql = mysqli_query($con,"call nuevo_materia('".$nombre."','".$descripcion."')");
		return $sql;

	}
}
?>