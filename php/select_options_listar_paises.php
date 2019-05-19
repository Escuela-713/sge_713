<?php
require_once "db_pais.php";

$obj=new pais();
$sql   = $obj->obtener_paises();

if(mysqli_num_rows($sql) == 0)
{
	echo '<option value="0">No hay datos</option>';
}
else
{
	echo '<option value="0">Seleccione</option>';
	while ($row = mysqli_fetch_assoc($sql)) {

		echo '<option value="'.$row['id_pais'].'">'.$row['nombre'].'</option>';

	}
}

?>	