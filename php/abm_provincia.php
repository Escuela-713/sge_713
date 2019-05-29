<?php
require_once "db_provincia.php";
require_once ("conexion.php");

if(!empty($_POST['delete_id']))
{
	$id=intval($_POST['delete_id']);
	$obj=new provincia();
	$query=$obj->eliminar_provincia($id);
}
elseif (intval($_POST['id'])==0){
	$name = mysqli_real_escape_string($con,(strip_tags($_POST["name"],ENT_QUOTES)));
	$id_pais=intval($_POST['id_pais']);

	$obj=new provincia();
	$query = $obj->nuevo_provincia($name,$id_pais);
} 
elseif (intval($_POST['id'])!=0)
{
	$name = mysqli_real_escape_string($con,(strip_tags($_POST["name"],ENT_QUOTES)));
	$id_pais=intval($_POST['id_pais']);
	$id=intval($_POST['id']);
	// UPDATE data into database
	$obj=new provincia();
	$query=$obj->modificar_provincia($id,$name,$id_pais);   

} else 
{
	$errors[] = "desconocido.";
}

if ($query)
{
	$messages[] = "El registro ha sido actualizado con éxito.";
} else {
	$errors[] = "Lo sentimos, la actualización falló. Por favor, regrese y vuelva a intentarlo.";
}

include("alerta.php");

?>			