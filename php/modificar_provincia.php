<?php
require_once "db_provincia.php";
require_once ("conexion.php");
$name = mysqli_real_escape_string($con,(strip_tags($_POST["name"],ENT_QUOTES)));
$id_pais=intval($_POST['id_pais']);

if (intval($_POST['id'])==0){
	$obj=new provincia();
	$query = $obj->nuevo_provincia($name,$id_pais);
} 
elseif (intval($_POST['id'])!=0)
{
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

include("alerta_abm.php");

?>			