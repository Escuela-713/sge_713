<?php

class empleado 
{	
	private $sql;

	public  function obtener_empleados()
	{
		include("conexion.php");
		$sql= mysqli_query($con, "CALL obtener_empleados();");
		return $sql;	
	}

	
	

}
?>