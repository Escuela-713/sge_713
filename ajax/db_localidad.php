<?php

class localidad 
{	
	private $sql;
	
	public  function obtener_localidades()
	{
		include("conexion.php");	
		$sql= "CALL obtener_localidades();";
		return mysqli_query($con,$sql);	
	}

	public function nuevo_localidad($nombre, $codigo_postal,$id_provincia)
	{
		include("conexion.php");
		$sql = "call nuevo_localidad('".$nombre."',".$codigo_postal.",".$id_provincia.")";
		return mysqli_query($con,$sql);
	}

	public function eliminar_localidad($id)
	{
		include("conexion.php");
		$sql = "call eliminar_localidad(".$id.")";
		return mysqli_query($con,$sql);
	}

	public function modificar_localidad($id,$nombre,$codigo_postal,$id_provincia)
	{
		include("conexion.php");
		$sql = "call modificar_localidad('".$nombre."',".$id.",".$id_provincia.",".$codigo_postal.")";
		return mysqli_query($con,$sql);	
	}
}
?>