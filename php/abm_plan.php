<?php
require_once "cls_plan.php";
require_once ("conexion.php");

if(!empty($_POST['delete_id']))
{
	$id=intval($_POST['delete_id']);
	$obj= new plan();
	$query = $obj->eliminar_plan($id);
}
elseif (intval($_POST['id']==0)  )
{
	$name = mysqli_real_escape_string($con,(strip_tags($_POST["name"],ENT_QUOTES)));
	$carrera=(int) $_POST["id_carrera"];
	$estado=(int) $_POST["estado"];
	$hs_catedra=(int) $_POST["horas_catedra"];
	$hs_reloj=(int) $_POST["horas_reloj"];

	$obj=new plan();
	$query=$obj->nuevo_plan($name,$carrera,$estado,$hs_catedra,$hs_reloj);
} 
elseif (intval($_POST['id'])!=0)
{
	$name = mysqli_real_escape_string($con,(strip_tags($_POST["name"],ENT_QUOTES)));
	$carrera=(int) $_POST["id_carrera"];
	$estado=(int) $_POST["estado"];
	$hs_catedra=(int) $_POST["horas_catedra"];
	$hs_reloj=(int) $_POST["horas_reloj"];
	
	$obj=new plan();
	$query=$obj->modificar_plan($id,$name,$id_carrera,$estado);
}
else 
{
	$errors[] = "desconocido.";
}

if ($query) 
{
	$messages[] = "El registro ha sido guardado con éxito.";
} 
else 
{
	$errors[] = "Lo sentimos, el registro falló. Por favor, regrese y vuelva a intentarlo.". $query;
}

include("alerta.php");

?>	