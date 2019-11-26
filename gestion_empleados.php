<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<title>Registro de Empleados</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="css/bootstrap.min.css" >
	<script src="js/jquery-3.2.1.min.js"></script>
	<script src="js/bootstrap.min.js"></script>
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">
</head>
<body>
  	<?php include("nav.php");?>  
	<div class="container">
		<div class="content">
			<h2>Lista de Empleados</h2>
			<hr />
			<br />
			<a href="#EmpleadoModal" class="btn btn-success" data-toggle="modal"><span>Agregar Nuevo Empleado</span></a>
			<div class='clearfix'></div>
			<div id="loader"></div><!-- Carga de datos ajax aqui -->
			<div id="resultados"></div><!-- Carga de datos ajax aqui -->
			<div class='outer_div'></div><!-- Carga de datos ajax aqui -->			
		</div>
	</div>

	<?php include("modal/modal_empleado.php");?>
	<?php include("modal/modal_eliminar.php");?>
	<script src="js/script_empleado.js"></script>

<?php include("footer.php");?>  

</body>
</html>