<?php
require_once "db_cargo.php";

$obj=new cargo();
$sql   = $obj->obtener_cargos();

if(mysqli_num_rows($sql) == 0)
{
	echo '<option value="0">No hay datos</option>';
}
else
{
	while ($row = mysqli_fetch_assoc($sql)) {

		echo '<option value="'.$row['id_cargo'].'">'.$row['nombre'].'</option>';

	}
}

?>	