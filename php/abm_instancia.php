<?php
require_once "cls_instancia.php";
require_once ("conexion.php");

if(!empty($_POST['delete_id']))
{
	$id=intval($_POST['delete_id']);
	
    $obj=new instancia();
    $query=$obj->eliminar_instancia($id);
}
elseif (intval($_POST['id'])==0)
{ 
	$nombre = mysqli_real_escape_string($con,(strip_tags($_POST["nombre"],ENT_QUOTES)));
	$id_instancia=(int) $_POST["id_instancia"];
	$nombre=(int) $_POST["nombre"];

	$obj=new instancia();
	$query=$obj->nuevo_instancia($nombre);
}
elseif (intval($_POST['id'])!=0)
{
	$nombre = mysqli_real_escape_string($con,(strip_tags($_POST["nombre"],ENT_QUOTES)));
	$id_instancia=(int) $_POST["id_instancia"];
	$obj=new instancia();
	$query =$obj->modificar_instancia($id_instancia,$nombre);
	
} else 
{
	$errors[] = "desconocido.";
}

if ($query) {
	$messages[] = "El registro ha sido actualizado con éxito.";
} else {
	$errors[] = "Lo sentimos, la actualización falló. Por favor, regrese y vuelva a intentarlo.";
}
include("alerta.php");
?>			