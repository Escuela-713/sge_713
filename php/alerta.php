<?php
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