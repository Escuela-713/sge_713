<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Registro de Cursos</title>

<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="css/bootstrap.min.css" >
<link rel="stylesheet" type="text/css" href="css/estilos-713.css">
<script src="js/jquery-3.2.1.min.js"></script>
<script src="js/bootstrap.min.js"></script>
</head>
<body>
	<?php include("nav.php");?>  
	<div class="container">
		<div class="content">
			<h2>Lista de Cursos</h2>
			<hr />
			<br />
			<a href="#CursoModal" class="btn btn-success" data-toggle="modal"><span>Agregar Nuevo Curso</span></a>
			<div class='clearfix'></div>
			<div id="loader"></div><!-- Carga de datos ajax aqui -->
			<div id="resultados"></div><!-- Carga de datos ajax aqui -->
			<div class='outer_div'></div><!-- Carga de datos ajax aqui -->		
		</div>
	</div>
	<!-- Add Modal HTML -->
	<?php include("modal/modal_cursos.php");?>
	<!-- Delete Modal HTML -->
	<?php include("modal/modal_eliminar.php");?>
	<script src="js/script_cursos.js"></script>
	<?php include("footer.php");?> 
</body>
</html>