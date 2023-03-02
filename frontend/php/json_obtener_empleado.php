<?php
	
require_once "cls_empleado.php";
include("conexion.php");

if (!empty($_POST['id']))
{	
	$id=intval($_POST['id']);
	$obj=new empleado($id);
	$myJSON = json_encode($obj);
	echo $myJSON;
}
else
{
	error_log("id vacio",3,"my-php-errors-logs.log");
}

?>