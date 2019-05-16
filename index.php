<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
	<meta name="viewport" content="width=device-width, intial-scale=1">
  <meta name="Author" content="Matias Brascar; Araceli Lopez; Franco Nolasco; Tupac Velasquez; Ezequiel Wodtcke">
  <link rel="stylesheet" href="css/w3.css">
  <link rel="stylesheet" type="text/css" href="css/estilos-713.css">
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
          <li class="nav-item active">
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
            <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">Registros </a>
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
<section>
<div class="container">
  <div id="demo" class="carousel slide" data-ride="carousel"> 
    <ul class="carousel-indicators">
      <li  data-slide-to="0" class="active"></li>
      <li  data-slide-to="1"></li>
      <li  data-slide-to="2"></li>
      <li  data-slide-to="3"></li>
      <li  data-slide-to="4"></li>
    </ul>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="img/1primera-carrusel.jpg" alt="#" width="1100" height="500">
      </div>
      <div class="carousel-item">
        <img src="img/2segunda-carrusel.jpg" alt="#" width="1100" height="500">
      </div>
      <div class="carousel-item">
        <img src="img/3tercera-carrusel.jpg" alt="#" width="1100" height="500">
      </div>
      <div class="carousel-item">
        <img src="img/cuarta-carrusel.jpg" alt="#" width="1100" height="500">
      </div>
      <div class="carousel-item">
        <img src="img/quinta-carrusel.jpg" alt="#" width="1100" height="500">
      </div>
      <a class="carousel-control-prev" href="#demo" data-slide="prev">
        <span class="carousel-control-prev-icon"></span>
      </a>
      <a class="carousel-control-next" href="#demo" data-slide="next">
        <span class="carousel-control-next-icon"></span>
      </a>
   </div>
  </div>
</div>
<div class="container">
    <div class="row"  >
      <div class="col-md-4">
        <div class="card-body w3-display-container w3-hover-opacity">
        <img class="card-img-top" src="img/colegio1.jpg" alt="Colegio 713">
          <h4 class="card-title">Colegio 713</h4>
          <p class="card-text"></p>
        <div class="w3-display-middle w3-display-hover w3-xlarge">
        </div>
        </div>
        </div>
      <div class="col-md-4">
        <div class="card-body w3-display-container w3-hover-opacity">
        <img class="card-img-top" src="img/orientaciones.png" alt="Orientación">
          <h4 class="card-title">Orientaciones</h4>
          <p class="card-text">ETP - Comunicaciones - Humanidades</p>
        <div class="w3-display-middle w3-display-hover w3-xlarge">
        </div>
        </div>
        </div>
      <div class="col-md-4">
        <div class="card-body w3-display-container w3-hover-opacity">
            <img class="card-img-top" src="img/eventos.jpg" alt="Eventos" >
            <h4 class="card-title">Eventos</h4>
            <p class="card-text"></p>
            <div class="w3-display-middle w3-display-hover w3-xlarge">
            </div>
        </div>
      </div>
    </div>
  </div>
  </section>
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
<?php include("modal/login.php");?>
</body>
</html>