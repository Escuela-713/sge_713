<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Registro de Orientaciones</title>

<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="css/bootstrap.min.css" >
<script src="js/jquery-3.2.1.min.js"></script>
<script src="js/bootstrap.min.js"></script>
</head>
<body>
	<?php include("nav.php");?>  
	<div class="container">
		<div class="content">
			<h2>Lista de Orientaciones</h2>
			<hr />
			<br />
			<a href="#addOrientacionModal" class="btn btn-success" data-toggle="modal"><span>Agregar Nueva Orientación</span></a>
			
			<div class='clearfix'></div>
			
			<div id="loader"></div><!-- Carga de datos ajax aqui -->
			<div id="resultados"></div><!-- Carga de datos ajax aqui -->
			<div class='outer_div'></div><!-- Carga de datos ajax aqui -->
			
		</div>
	</div>
	<?php include("footer.php");?>  
	<?php include("modal/modal_modificar_orientacion.php");?>
	<?php include("modal/modal_nuevo_orientacion.php");?>
	<?php include("modal/modal_eliminar_orientacion.php");?>
	<?php include("modal/login.php");?>
	
	<script src="js/script_orientaciones.js"></script>

</body>
</html>