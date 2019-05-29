<?php
require_once "db_pais.php";
require_once ("conexion.php");
$name = mysqli_real_escape_string($con,(strip_tags($_POST["name"],ENT_QUOTES)));

if (intval($_POST['id'])==0)
{ 
	$obj=new pais();
	$query = $obj->nuevo_pais($name);
} 
elseif (intval($_POST['id'])!=0)
{
	$id=intval($_POST['id']);
	$obj=new pais();
	$query =$obj->modificar_pais($id,$name);
	
} else 
{
	$errors[] = "desconocido.";
}

if ($query) {
	$messages[] = "El registro ha sido actualizado con éxito.";
} else {
	$errors[] = "Lo sentimos, la actualización falló. Por favor, regrese y vuelva a intentarlo.";
}
include("alerta_abm.php");
?>			