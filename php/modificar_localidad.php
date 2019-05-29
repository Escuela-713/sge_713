<?php
require_once "db_localidad.php";
include("conexion.php");
$name = mysqli_real_escape_string($con,(strip_tags($_POST["name"],ENT_QUOTES)));
$id_provincia=intval($_POST['id_provincia']);
$cp=intval($_POST['cp']);

if (intval($_POST['id'])==0){
	$obj=new localidad();
	$query=$obj->nuevo_localidad($name,$cp,$id_provincia);
} 
elseif (intval($_POST['id'])!=0){
	
	$id=intval($_POST['id']);	
	$obj=new localidad();
	$query=$obj->modificar_localidad($id,$name,$cp,$id_provincia);
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