<?php
require_once "db_provincia.php";

if (!empty($_POST['id_pais'])){

	$id_pais=intval($_POST['id_pais']);
	$obj=new provincia();
	$sql   = $obj->obtener_provincias_por_pais($id_pais);

	if(mysqli_num_rows($sql) == 0)
	{
		echo '<option value="0">No hay datos</option>';
	}
	else
	{
		echo '<option value="0">Seleccione</option>';
		while ($row = mysqli_fetch_assoc($sql)) {
			
			echo '<option value="'.$row['id_provincia'].'">'.$row['nombre'].'</option>';
			
		}
	}
}
else
{
	echo '<option value="0">No hay datos</option>';
}
?>	