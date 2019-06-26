<?php

class pais 
{	
	private $sql;

	public  function obtener_paises()
	{
		include("conexion.php");
		$sql= mysqli_query($con, "CALL obtener_paises();");
		return $sql;	
	}

	public function nuevo_pais($nombre)
	{
		include("conexion.php");
		// INSERT data into database
	    $sql =mysqli_query($con, "call nuevo_pais('".$nombre."')");
	    return $sql;
	}
	
	public function modificar_pais($id,$nombre)
	{
		include("conexion.php");
		$sql =mysqli_query($con, "call modificar_pais('".$nombre."',".$id.")");
		return $sql;
	}

	public function eliminar_pais($id)
	{
		include("conexion.php");
		$sql =mysqli_query($con, "call eliminar_pais(".$id.")");
		return $sql;
	}
	

}
?>