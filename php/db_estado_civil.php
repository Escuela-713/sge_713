<?php

class estado_civil
{	
	private $sql;
	
	public function obtener_estados_civil()
	{
		include("conexion.php");	
		$sql= "CALL obtener_estados_civil();";
		return mysqli_query($con,$sql);	
	}

}
?>