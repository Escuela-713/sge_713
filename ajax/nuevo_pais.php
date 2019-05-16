<?php
	//Valido que el usuario ingrese el valor del país
	if (empty($_POST['name']))
	{
		$errors[] = "Ingresa el nombre del Pais.";
	} 

	elseif (!empty($_POST['name']))
	{
	
	require_once ("conexion.php");//Contiene funcion que conecta a la base de datos
	
    $pais_name = mysqli_real_escape_string($con,(strip_tags($_POST["name"],ENT_QUOTES)));
	
	// INSERT data into database
    $sql = "call nuevo_pais('".$pais_name."')";
    $query = mysqli_query($con,$sql);
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