<?php

require_once "cls_empleado.php";
include("conexion.php");

if(!empty($_POST['delete_id']))
{
	$id=intval($_POST['delete_id']);
	$obj=new empleado();
	$query=$obj->eliminar_empleado($id);
}
elseif (intval($_POST['id'])==0)
{
	$nombre = mysqli_real_escape_string($con,(strip_tags($_POST["nombre"],ENT_QUOTES)));
	$apellido = mysqli_real_escape_string($con,(strip_tags($_POST["apellido"],ENT_QUOTES)));
	$dni=intval($_POST['dni']);
	$legajo=intval($_POST['legajo']);
	$fecha_de_ingreso=mysql_real_escape_string(($_POST['fecha_de_ingreso']));
	$id_cargo=intval($_POST['id_cargo']);
	$fecha_de_nacimiento=mysql_real_escape_string(($_POST['fecha_de_nacimiento']));
	$id_localidad_nac=intval($_POST['id_localidad']);
	$sexo = mysqli_real_escape_string($con,(strip_tags($_POST["sexo"],ENT_QUOTES)));
	$id_estado_civil=intval($_POST['id_estado_civil']);
	$id_localidad_residencia=intval($_POST['id_localidad_d']);
	$barrio = mysqli_real_escape_string($con,(strip_tags($_POST["barrio"],ENT_QUOTES)));
	$calle = mysqli_real_escape_string($con,(strip_tags($_POST["calle"],ENT_QUOTES)));
	$numero=intval($_POST['numero']);
	$telefono = mysqli_real_escape_string($con,(strip_tags($_POST["telefono"],ENT_QUOTES)));

	$obj=new empleado();
	$query=$obj->nuevo_empleado($nombre, $apellido,$sexo,$fecha_de_nacimiento,$id_estado_civil,$dni,$calle,$numero,$barrio,$telefono,$id_localidad_residencia,$fecha_de_ingreso,$legajo,$id_cargo,$id_localidad_nac); 
} 
elseif (!empty($_POST['id']))
{	
	
	$id=intval($_POST['id']);
	$nombre = mysqli_real_escape_string($con,(strip_tags($_POST["nombre"],ENT_QUOTES)));
	$apellido = mysqli_real_escape_string($con,(strip_tags($_POST["apellido"],ENT_QUOTES)));
	$dni=intval($_POST['dni']);
	$legajo=intval($_POST['legajo']);
	$fecha_de_ingreso=mysql_real_escape_string(($_POST['fecha_de_ingreso']));
	$id_cargo=intval($_POST['id_cargo']);
	$fecha_de_nacimiento=mysql_real_escape_string(($_POST['fecha_de_nacimiento']));
	$id_localidad_nac=intval($_POST['id_localidad']);
	$sexo = mysqli_real_escape_string($con,(strip_tags($_POST["sexo"],ENT_QUOTES)));
	$id_estado_civil=intval($_POST['id_estado_civil']);
	$id_localidad_residencia=intval($_POST['id_localidad_d']);
	$barrio = mysqli_real_escape_string($con,(strip_tags($_POST["barrio"],ENT_QUOTES)));
	$calle = mysqli_real_escape_string($con,(strip_tags($_POST["calle"],ENT_QUOTES)));
	$numero=intval($_POST['numero']);
	$telefono = mysqli_real_escape_string($con,(strip_tags($_POST["telefono"],ENT_QUOTES)));
	

	$obj=new empleado();
	$query=$obj->modificar_empleado($id,$nombre, $apellido,$sexo,$fecha_de_nacimiento,$id_estado_civil,$dni,$calle,$numero,$barrio,$telefono,$id_localidad_residencia,$fecha_de_ingreso,$legajo,$id_cargo,$id_localidad_nac);	
}
else
{
	$errors[] = "desconocido.";
}    


if ($query) 
{
	$messages[] = "El registro ha sido actualizado con éxito.";
} 
else 
{
    $errors[] = "Lo sentimos, la actualización falló. Por favor, regrese y vuelva a intentarlo.";
}
		

include("alerta.php");
?>			