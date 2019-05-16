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
	<nav class="navbar navbar-expand-sm bg-dark navbar-dark fixed-top"> 
    <div class="navbar-header">
      <a class="navbar-brand" href="#">
      <img class="rounded-circle" src="img/logo.png" alt="Logo" style="width:60px;">
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=" #collapsibleNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
    <div class="collapse navbar-collapse" id="collapsibleNavbar">
      <ul class="nav navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="index.php"> 713 </a>
          </li>
          <li class="nav-item">
            <a class=" nav-link" href="#"> Orientaciones </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"> Alumnos </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"> Profesores </a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle active" href="#" id="navbardrop" data-toggle="dropdown">Registros </a>
            <div class="dropdown-menu">
              <a class="dropdown-item" href="registro_paises.php">Paises</a>
              <a class="dropdown-item" href="registro_provincias.php">Provincias</a>
              <a class="dropdown-item" href="registro_localidades.php">Localidades</a>
              <a class="dropdown-item" href="registro_de_empleados.php">Empleados</a>
              <a class="dropdown-item" href="registro_cargos.php">Cargos</a>
              <a class="dropdown-item" href="registro_orientaciones.php">Orientaciones</a>
            </div>
          </li>
           <li class="nav-item">
            <a class="nav-link" href="#"> Blog </a>
          </li>
         
      </ul>
      <ul class="nav navbar-nav navbar-right">
         <li class="nav-item">
            <a class="nav-link" href="#Login" data-toggle="modal">Iniciar Sesión</a>
          </li>
      </ul>
    </div>
  </nav> 
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
	<footer class="bg-dark text-white p-md-4 container-fluid">
    <div class="row">
    
      <div class="col-md-8">
          <div id="googleMap" style="width:100%;height:200px;">
          
          </div>
          <script>
            function myMap() {
            var mapProp= {
            center:new google.maps.LatLng(-42.9114700, -71.3194700),
            zoom:10,
            };
            var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
            }
          </script>
          <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBzYei32l-gSTdBoiIbisGgg2cBwPutAf4&callback=myMap"></script>

      </div>
      <div class="col-md-4">
        <h4><p>Escuela 713</p></h4>
        <h6><p>Alsina 2252, 9200 Esquel</p></h6>
        <h6><p>02945-451395</p></h6>
        <h6><a  href="https://www.facebook.com/escuela713/?ref=br_rs" target="_blak">Ir a Facebook 713</a></h6>
      </div>
   </div>

</footer>
	<?php include("modal/modal_modificar_orientacion.php");?>
	<?php include("modal/modal_nuevo_orientacion.php");?>
	<?php include("modal/modal_eliminar_orientacion.php");?>
	<?php include("modal/login.php");?>
	
	<script src="js/script_orientaciones.js"></script>

</body>
</html>