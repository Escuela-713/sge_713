<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="css/bootstrap.min.css" >
	<script src="js/jquery-3.2.1.min.js"></script>
	<script src="js/bootstrap.min.js"></script>
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">
</head>
<body>
<?php include("nav.php");?> 
<br>
<h1> Registro de Alumno </h1>
  <br>
  <div class="container-fluid">
    <div class="row m-s">
        <div class="col-sm-2">
            <input class="btn-lg" id="myInput" style="background-color:#cce5ff" type="text" placeholder="filtrar por">   
        </div>
        <div class="col-sm">
    
        </div>
        <div class="col-sm-3 ">
            <div class="input-group input-group-lg" ><input type="text"
                    class="bn-sm"
                    aria-label="small" aria-describedby="inputGroup-sizing-sm" style="background-color:#cce5ff">
                <div class="input-group-prepend ">
                    <button class="input-group-text" style="background-color:#cce5ff"
                    id="inputGroup-sizing-lg">BUSCAR</button>
                </div>
            </div>
        </div>
    </div> 
    
  <table class="table table-bordered table-striped">
    <thead>
      <tr>
        <th class="border border-dark">Nombre y Apellido</th>
        <th class="border border-dark">DNI</th>
        <th class="border border-dark" >N° de telefono</th>
        <th class="border border-dark">N° del tutor</th>
        <th class="border border-dark">Edad</th>
        <th class="border border-dark">Modalidad</th>
        <th class="border border-dark">Año</th>
        <th class="border border-dark">División</th>
      </tr>
    </thead>
    <tbody id="myTable">
      <tr>
        <td class="border border-dark">Florencia Saunders</td>
        <td class="border border-dark">44284752</td>
        <td class="border border-dark">2945529048</td>
        <td class="border border-dark">2945454545</td>
        <td class="border border-dark">19</td>
        <td class="border border-dark">ETP</td>
        <td class="border border-dark" >7°</td>
       <td class="border border-dark">1°</td>
    
      </tr>
      <tr>
        <td class="border border-dark">José Pinilla</td>
        <td class="border border-dark">45107469</td>
        <td class="border border-dark">2945407174 </td>
        <td class="border border-dark">2945455555</td>
        <td class="border border-dark">118</td>
        <td class="border border-dark">ETP</td>
        <td class="border border-dark">7°</td>
        <td class="border border-dark">1°</td>
      </tr>
      <tr>
        <td class="border border-dark" >Martiniano Toso</td>
        <td class="border border-dark">46321876</td>
        <td class="border border-dark">2945678876</td>
        <td class="border border-dark">2945121314 </td>
        <td class="border border-dark">16</td>
        <td class="border border-dark">Humanidades</td>
        <td class="border border-dark">5°</td>
        <td class="border border-dark">2°</td>

      </tr>
      <tr>
        <td class="border border-dark">Rony Winter</td>
        <td class="border border-dark">47345987 </td>
        <td class="border border-dark">2945606060 </td>
        <td class="border border-dark">2945679876 </td>
        <td class="border border-dark">14</td>
        <td class="border border-dark">Humanidades</td>
        <td class="border border-dark">3°</td>
        <td class="border border-dark">1°</td>
      </tr>
      <tr>
        <td class="border border-dark">Teo Bustamante</td>
        <td class="border border-dark">43713137 </td>
        <td class="border border-dark">2945713713</td>
        <td class="border border-dark">2945713715 </td>
        <td class="border border-dark">20</td>
        <td class="border border-dark">Comunicaciones</td>
        <td class="border border-dark">5°</td>
        <td class="border border-dark">2°</td>
      </tr>
       <tr>
        <td class="border border-dark">Mia Zarra</td>
        <td class="border border-dark">44098980 </td>
        <td class="border border-dark">01154862317</td>
        <td class="border border-dark">2945098890</td>
        <td class="border border-dark">19</td>
        <td class="border border-dark">Comunicaciones</td>
        <td class="border border-dark">6°</td>
        <td class="border border-dark">1°</td>
      </tr>
      <tr>
        <td class="border border-dark">Gisela Vargas</td>
        <td class="border border-dark">46123321</td>
        <td class="border border-dark">2945121212</td>
        <td class="border border-dark">2945101212</td>
        <td class="border border-dark">17</td>
        <td class="border border-dark">ETP</td>
        <td class="border border-dark">6°</td>
        <td class="border border-dark">2°</td>
      </tr>
      <tr>
        <td class="border border-dark">Oriana Railef</td>
        <td class="border border-dark">44284757</td>
        <td class="border border-dark">2945546049 </td>
        <td class="border border-dark">2945612390</td>
        <td class="border border-dark">19</td>
        <td class="border border-dark">ETP</td>
        <td class="border border-dark">7°</td>
        <td class="border border-dark">1°</td>
      </tr>
      <tr>
        <td class="border border-dark">Benjamin Castro</td>
        <td class="border border-dark">44947352</td>
        <td class="border border-dark">2945654256</td>
        <td class="border border-dark">2945655642 </td>
        <td class="border border-dark">18</td>
        <td class="border border-dark">ETP</td>
        <td class="border border-dark">7°</td>
        <td class="border border-dark">1°</td>
      </tr>
      <tr>
        <td class="border border-dark">Lautaro Cuadrado</td>
        <td class="border border-dark">45086183 </td>
        <td class="border border-dark">2945656835 </td>
        <td class="border border-dark">2945653568</td>
        <td class="border border-dark">19</td>
        <td class="border border-dark">ETP</td>
        <td class="border border-dark">7°</td>
        <td class="border border-dark">1°</td>
      </tr> 
  </table>
  <p align="right">
  <button type="button" class="btn btn-lg" style="background-color:#6495ED">EDITAR</button>
  <button type="button" class="btn btn-lg" style="background-color:#6495ED">GUARDAR</button>
</p>
</div>

</body>
</html>