<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="css/bootstrap.min.css" >

<script src="js/jquery-3.2.1.min.js"></script>
<script src="js/bootstrap.bundle.min.js"></script>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://getbootstrap.com/docs/5.2/assets/css/docs.css" rel="stylesheet">
    <title>Datos Académicos</title>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" type="text/css" href="css/estilos-713.css">
</head>
<body class="bd-example" >
<?php include("nav.php");?>  
<h1>Datos Académicos</h1>
<div class="container-fluid">
    <div class="row">
        <div class="col-3" style="background-color:#B0E0E6"> 
        <label for="floatingEmptyPlaintextInput">Orientación</label>
         <select class="form-select form-select-lg mb-5"   aria-label=".form-select-lg example" >
  <option selected>--------------</option>
  <option value="1">ETP</option>
  <option value="2">Humanidades</option>
  <option value="3">Comunicaciones</option>
</select>

</select>
 <label for="floatingEmptyPlaintextInput">Curso</label>
<select class="form-select form-select-lg mb-5" aria-label=".form-select-lg example">
   <option selected>------------</option>
  <option value="1">1º</option>
  <option value="2">2º</option>
  <option value="3">3º</option>
  <option value="4">4º</option>
  <option value="5">5º</option>
  <option value="6">6º</option>
  <option value="7">7º</option>
</select>
<label for="floatingEmptyPlaintextInput">División</label>
<select class="form-select form-select-lg mb-5" aria-label=".form-select-lg example">
  <option selected>--------------</option>
  <option value="1">1era</option>
  <option value="2">2da</option>
  <option value="3">3era</option>
</select>
<label for="floatingEmptyPlaintextInput">Materia</label>
<select class="form-select form-select-lg mb-5" aria-label=".form-select-lg example">
  <option selected>------------</option>
  <option value="1">Lengua</option>
  <option value="2">Matematica</option>
  <option value="3">Historia</option>
  <option value="4">Geografia</option>
  <option value="5">Educacion Fisica</option>
  <option value="6">Desarrollo IV</option>
</select>
<label for="floatingEmptyPlaintextInput">Instancia</label>
<select class="form-select form-select-lg mb-5" aria-label=".form-select-lg example">
  <option selected>------------</option>
  <option value="1">1º</option>
  <option value="2">2º</option>
  <option value="3">3º</option>
  <option value="4">Instancia diciembre</option>
  <option value="5">Instancia marzo</option>
  <option value="6">Nota final</option>
</select>
  </div>
   
    
      <div class="col-8">
       
      <table class="table ">
    
  <thead>
      <tr >
          <th class="col-6 border border-dark text-center "  scope="col">Estudiantes</th>
          <th class="col-6 border border-dark text-center " scope="col">Notas</th>
      </tr>
  </thead>
  
  <tbody>
      <tr>
          <td class="border border-dark" scope="row">Florencia Saunders</td>
          <td class="border border-dark text-center">8</td>
      </tr>
      <tr>
      <td class="border border-dark" scope="row">Oriana Railef</td>
          <td class="border border-dark text-center">10</td>
      </tr>
      <tr>
      <td class="border border-dark" scope="row">Jose Luis Pinilla</td>
          <td class="border border-dark text-center">6</td>
      </tr>
      <tr>
      <td class="border border-dark" scope="row">Benjamín Castro</td>
          <td class="border border-dark text-center">7</td>
      </tr>
      <tr>
      <td class="border border-dark" scope="row">Lautaro Cuadrado</td>
          <td class="border border-dark text-center">10</td>
      </tr>
  </tbody>
  
</table>

<br>
<br>
<br>
<br>
    <p align="right">
      <button type="button" class="btn btn-info btn-lg" style="background-color:#6495ED"> <strong> Editar</strong></button>
      <button type="button" class="btn btn-info btn-lg justify-content-end" style="background-color:#6495ED"><strong>Guardar</strong></button>
    </p>
      
      </div>
    </div>

  
    

	<?php include("modal/modal_alumno.php");?>
	<?php include("modal/modal_eliminar.php");?>
	<script src="js/script_alumno.js"></script>
 
  <?php include("footer.php");?>  
</body>
</html>