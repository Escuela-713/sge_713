<?php
require_once "cls_localidad.php";

if (!empty($_POST['id_provincia'])){

	$id_provincia=intval($_POST['id_provincia']);
	$obj=new localidad();
	$sql   = $obj->obtener_localidades_por_provincia($id_provincia);

	if(mysqli_num_rows($sql) == 0)
	{
		echo '<option value="0">No hay datos</option>';
	}
	else
	{
		while ($row = mysqli_fetch_assoc($sql)) {
			echo '<option value="'.$row['id_localidad'].'">'.$row['nombre'].'</option>';
		}
	}
}
else
{
	echo '<option value="0">No hay datos</option>';
}
?>	