<?php
	//Valido que el usuario ingrese el valor del país
require_once "db_localidad.php";

if (empty($_POST['name'] ))
{
	$errors[] = "Nombre vacío";
} 

elseif (!empty($_POST['name'] && $_POST['id_provincia']))
{
	require_once ("conexion.php");
	$localidad_name = mysqli_real_escape_string($con,(strip_tags($_POST["name"],ENT_QUOTES)));
	$localidad_cp=intval($_POST["cp"]);
	$localidad_id_provincia=intval($_POST["id_provincia"]);
	
	// INSERT data into database
	$obj=new localidad();
	$query=$obj->nuevo_localidad($localidad_name,$localidad_cp,$localidad_id_provincia);
    // if product has been added successfully
	if ($query) 
	{
		$messages[] = "El registro ha sido guardado con éxito.";
	} 
	else 
	{
		$errors[] = "Lo sentimos, el registro falló. Por favor, regrese y vuelva a intentarlo.". $query;
	}
} 
else 
{
	$errors[] = "desconocido.";
}


if (isset($errors))
{

	?>
	<div class="alert alert-danger" role="alert">
		<button type="button" class="close" data-dismiss="alert">&times;</button>
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
