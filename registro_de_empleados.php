<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Registro de Empleados</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="css/bootstrap.min.css" >
	<script src="js/jquery-3.2.1.min.js"></script>
	<script src="js/bootstrap.min.js"></script>
	
 <!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>-->

</head>
<body>
  <?php include("nav.php");?>  
	<div class="container">
		<div class="content">
			<h2>Lista de Empleados</h2>
			<hr />
			<br />
			<a href="#addEmpleadoModal" class="btn btn-success" data-toggle="modal"><span>Agregar Nuevo Empleado</span></a>
			
			<div class='clearfix'></div>
			
			<div id="loader"></div><!-- Carga de datos ajax aqui -->
			<div id="resultados"></div><!-- Carga de datos ajax aqui -->
			<div class='outer_div'></div><!-- Carga de datos ajax aqui -->
			
		</div>
	</div>

<!-- Add Modal HTML -->
	<?php include("modal/modal_nuevo_empleado.php");?>
	<!-- Edit Modal HTML -->
	<?php include("modal/modal_modificar_empleado.php");?>
	<!-- Delete Modal HTML -->
	<?php include("modal/modal_eliminar_empleado.php");?>
	<script src="js/script_empleado.js"></script>

<?php include("footer.php");?>  


</body>
</html>