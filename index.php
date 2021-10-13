<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
	<meta name="viewport" content="width=device-width, intial-scale=1">
  <meta name="Author" content="Matias Brascar; Araceli Lopez; Franco Nolasco; Tupac Velasquez; Ezequiel Wodtcke; Ludmila Chacon; Catalina Devesa; Camila de Godos Van Der Merwe; Julieta Rivera; Miguel Quinteros; Ivana Brunt; Isabel Jones; Alejandra Diaz; Agustin Escobar; Martina Reguilo; Francisco Beckmann; Anahi Nahuelquir">
  <link rel="stylesheet" href="css/w3.css">
  <link rel="stylesheet" type="text/css" href="css/estilos-713.css">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="css/bootstrap.min.css" >
  <link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.7.0/css/all.css' integrity='sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ' crossorigin='anonymous'>
  <script src="js/jquery-3.2.1.min.js"></script>
  <script src="js/bootstrap.min.js"></script>
  <title>SGE-713</title>

   <!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>-->
  
</head>
<body class="w3-animate-opacity">
<?php include("nav.php");?>  

  <header> 
    <div class="">
      <div id="demo" class="carousel slide" data-ride="carousel"> 
        <ul class="carousel-indicators">
          <li  data-slide-to="0" class="active"></li>
          <li  data-slide-to="1"></li>
          <li  data-slide-to="2"></li>
          <li  data-slide-to="3"></li>
          <li  data-slide-to="4"></li>
          <li  data-slide-to="5"></li>

        </ul>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="img/1-slider.jpg" alt="#" width="100%" height="440">
          </div>
          <div class="carousel-item">
            <img src="img/2-slider.jpg" alt="#" width="100%" height="440">
          </div>
          <div class="carousel-item">
            <img src="img/3-slider.jpg" alt="#" width="100%" height="440">
          </div>
          <div class="carousel-item">
            <img src="img/4-slider.jpg" alt="#" width="100%" height="440">
          </div>
          <div class="carousel-item">
            <img src="img/5-slider.jpg" alt="#" width="100%" height="440">
          </div>
          <div class="carousel-item">
            <img src="img/6-slider.jpg" alt="#" width="100%" height="440">
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
  </header>
</br>
  <section>
    <div class="container">
        <div class="row"  >
          <div class="col-md-4 mb-4">
            <div class="card w3-hover-shadow w3-center h-100">
            <img class="card-img-top" src="img/colegio1.jpg" alt="Colegio 713">
            <br>
              <h3 class="card-title text-center">Colegio 713</h3>
              <p class="card-text"></p>
            <div class="w3-display-middle w3-display-hover w3-xlarge">
            </div>
            </div>
            </div>
          <div class="col-md-4 mb-4">
            <div class="card w3-hover-shadow w3-center h-100">
            <img class="card-img-top" src="img/orientaciones1.jpg" alt="Orientación">
            <br>
              <h4 class="card-title text-center">Orientaciones</h4>
              <p class="card-text">Comunicaciones - Humanidades - ETP</p>
            <div class="w3-display-middle w3-display-hover w3-xlarge">
            </div>
            </div>
            </div>
          <div class="col-md-4 mb-4">
            <div class="card w3-hover-shadow w3-center h-100">
                <img class="card-img-top" src="img/evento.jpeg" alt="Eventos" >
                <br>
                <h3 class="card-title text-center">Eventos</h3>
                <p class="card-text"></p>
                <div class="w3-display-middle w3-display-hover w3-xlarge">
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  
<?php include("footer.php");?>	
<?php include("modal/modal_login.php");?>
<p>@2021</p>
<p>Aprendiendo git branching</p>
</body>
</html>