<?php

class plan
{	
	private $sql;
	public  function obtener_planes()
	{
		include("conexion.php");
		$sql= mysqli_query($con, "CALL obtener_plan();");
		return $sql;	
	}

	public function eliminar_plan($id)
	{
		include("conexion.php");
		$sql = mysqli_query($con,"call eliminar_plan(".$id.")");
	    return $sql;
	}

	public function modificar_plan($id,$id_carreras,$plan,$estado,$hs_catedra,$hs_reloj)
	{
		include("conexion.php");
		$sql = mysqli_query($con,"call modificar_plan(".$id.",".$id_carreras.",'".$plan."','".$estado."','".$hs_catedra."','".$hs_reloj."')");
		return $sql;

	}

	public function nuevo_plan($plan,$id_carreras,$estado,$hs_catedra,$hs_reloj)
	{
		include("conexion.php");
		$sql = mysqli_query($con,"call nuevo_plan(".$id_carreras.",'".$plan."',".$estado.",".$hs_catedra.",".$hs_reloj.")");
		return $sql;

	}
}
?>