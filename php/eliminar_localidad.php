<?php

require_once "db_localidad.php";

if (empty($_POST['delete_id']))
{
	$errors[] = "Id vacío.";
} elseif (!empty($_POST['delete_id'])){
	
	$id_localidad=intval($_POST['delete_id']);
	
	$obj=new localidad();
	$query=$obj->eliminar_localidad($id_localidad);

	if ($query) {
		$messages[] = "El registro ha sido eliminado con éxito.";
	} else {
		$errors[] = "Lo sentimos, la eliminación falló. Por favor, regrese y vuelva a intentarlo.";
	}

} else 
{
	$errors[] = "desconocido.";
}
if (isset($errors)){

	?>
	<div class="alert alert-danger" role="alert">
		<button type="button" class="close"  data-dismiss="alert">&times;</button>
		<strong>Error!</strong> 
		<?php
		foreach ($errors as $error) {
			echo $error;
		}
		?>
	</div>
	<?php
}
if (isset($messages)){

	?>
	<div class="alert alert-success" role="alert">
		<button type="button" class="close" data-dismiss="alert">&times;</button>
		<strong>¡Bien hecho!</strong>
		<?php
		foreach ($messages as $message) {
			echo $message;
		}
		?>
	</div>
	<?php
}
?>			