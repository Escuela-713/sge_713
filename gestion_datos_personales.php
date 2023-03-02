<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de Alumnos</title>
    <link rel="stylesheet" href="css/bootstrap.min.css" >
	<script src="js/jquery-3.2.1.min.js"></script>
	<script src="js/bootstrap.min.js"></script>
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">
</head>
<body>
<?php include("nav.php");?>  
	

	<div class="container">
		<div class="content">
			<h2>Lista de Alumnos</h2>
			<hr />
			<br />
			<a href="#AlumnoModal" class="btn btn-success" data-toggle="modal"><span>Agregar Nuevo Alumno</span></a>
			<div class='clearfix'></div>
			<div id="loader"></div><!-- Carga de datos ajax aqui -->
			<div id="resultados"></div><!-- Carga de datos ajax aqui -->
			<div class='outer_div'></div><!-- Carga de datos ajax aqui -->			
		</div>
	</div>

	<?php include("modal/modal_alumno.php");?>
	<?php include("modal/modal_eliminar.php");?>
	<script src="js/script_alumno.js"></script>


<?php include("footer.php");?>  
    
</body>
</html>