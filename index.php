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
<?php include("nav.php");?>  
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
<?php include("footer.php");?>	
<?php include("modal/login.php");?>
</body>
</html>