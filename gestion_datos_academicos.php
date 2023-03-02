<!DOCTYPE html>
<html lang="en">
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="css/bootstrap.min.css" >
<link rel="stylesheet" type="text/css" href="css/estilos-713.css">
<script src="js/jquery-3.2.1.min.js"></script>
<script src="js/bootstrap.bundle.min.js"></script>
    <title>Document</title>
    <style>
        
    </style>
</head>
<body>

  <div class="container">
  <table class="table border border-dark">
        <thead>
            <tr >
                <th class="border border-dark" scope="col">Estudiantes</th>
                <th class="border border-dark" scope="col">Notas</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="border border-dark" scope="row">Florencia Saunders</td>
                <td class="border border-dark">8</td>
            </tr>
            <tr>
            <td class="border border-dark" scope="row">Oriana Railef</td>
                <td class="border border-dark">10</td>
            </tr>
            <tr>
            <td class="border border-dark" scope="row">Jose Luis Pinilla</td>
                <td class="border border-dark">6</td>
            </tr>
            <tr>
            <td class="border border-dark" scope="row">Benjamin Castro</td>
                <td class="border border-dark">7</td>
            </tr>
            <tr>
            <td class="border border-dark" scope="row">Lautaro Cuadrado</td>
                <td class="border border-dark">10</td>
            </tr>
          
        </tbody>
    </table>
    
        <button type="button" class="btn btn-info btn-lg">Editar</button>
        <button type="button" class="btn btn-info btn-lg">Guardar</button>
  </div>



	<?php include("modal/modal_alumno.php");?>
	<?php include("modal/modal_eliminar.php");?>
	<script src="js/script_alumno.js"></script>
 
</body>
</html>