<?php
class curso
{	
	private $sql;
	public  function obtener_cursos()
	{
		include("conexion.php");
		$sql= mysqli_query($con, "CALL obtener_cursos();");
		return $sql;	
	}

	public function eliminar_curso($id)
	{
		include("conexion.php");
		$sql = mysqli_query($con,"call eliminar_curso(".$id.")");
	    return $sql;
	}

	public function modificar_curso($id,$division,$año)
	{
		include("conexion.php");
		$sql = mysqli_query($con,"call modificar_curso(".$id.",'".$division."',".$año.")");
		return $sql;

	}

	public function nuevo_curso($division,$año)
	{
		include("conexion.php");
		$sql = mysqli_query($con,"call nuevo_curso('".$division."','".$año."')");
		return $sql;

	}
}
?>