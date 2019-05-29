<?php
require_once "db_estado_civil.php";

$obj=new estado_civil();
$sql   = $obj->obtener_estados_civil();

if(mysqli_num_rows($sql) == 0)
{
	echo '<option value="0">No hay datos</option>';
}
else
{
	while ($row = mysqli_fetch_assoc($sql)) {
		echo '<option value="'.$row['id_estado_civil'].'">'.$row['nombre'].'</option>';
	}
}

?>	