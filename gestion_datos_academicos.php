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
      <div class="col-3" style="background-color:#E6EFFF"> 
        <label for="floatingEmptyPlaintextInput">Orientación</label>
          <select class="form-select form-select-lg mb-5"  style="background-color:#CAD5FB" aria-label=".form-select-lg example" >
           <option selected style="background-color:#9CB3FF">--------------</option>
            <option value="1" style="background-color:#9CB3FF">ETP</option>
            <option value="2"  style="background-color:#9CB3FF">Humanidades</option>
            <option value="3"  style="background-color:#9CB3FF">Comunicaciones</option>
          </select>
        <label for="floatingEmptyPlaintextInput">Curso</label>
            <select class="form-select form-select-lg mb-5" style="background-color:#CAD5FB" aria-label=".form-select-lg example">
              <option selected>------------</option>
              <option value="1" style="background-color:#9CB3FF">1º</option>
              <option value="2" style="background-color:#9CB3FF">2º</option>
              <option value="3" style="background-color:#9CB3FF">3º</option>
              <option value="4" style="background-color:#9CB3FF">4º</option>
              <option value="5" style="background-color:#9CB3FF">5º</option>
              <option value="6" style="background-color:#9CB3FF">6º</option>
              <option value="7" style="background-color:#9CB3FF">7º</option>
            </select>
          <label for="floatingEmptyPlaintextInput">División</label>
            <select class="form-select form-select-lg mb-5" style="background-color:#CAD5FB" aria-label=".form-select-lg example">
              <option selected>--------------</option>
              <option value="1" style="background-color:#9CB3FF">1era</option>
              <option value="2" style="background-color:#9CB3FF">2da</option>
              <option value="3" style="background-color:#9CB3FF">3era</option>
            </select>
          <label for="floatingEmptyPlaintextInput">Materia</label>
            <select class="form-select form-select-lg mb-5" style="background-color:#CAD5FB" aria-label=".form-select-lg example">
              <option selected>------------</option>
              <option value="1" style="background-color:#9CB3FF">Lengua</option>
              <option value="2" style="background-color:#9CB3FF">Matematica</option>
              <option value="3" style="background-color:#9CB3FF">Historia</option>
              <option value="4" style="background-color:#9CB3FF">Geografia</option>
              <option value="5" style="background-color:#9CB3FF">Educacion Fisica</option>
              <option value="6" style="background-color:#9CB3FF">Desarrollo IV</option>
            </select>
          <label for="floatingEmptyPlaintextInput">Instancia</label>
            <select class="form-select form-select-lg mb-5" style="background-color:#CAD5FB" aria-label=".form-select-lg example">
              <option selected>------------</option>
              <option value="1" style="background-color:#9CB3FF">1º</option>
              <option value="2" style="background-color:#9CB3FF">2º</option>
              <option value="3" style="background-color:#9CB3FF">3º</option>
              <option value="4" style="background-color:#9CB3FF">Instancia diciembre</option>
              <option value="5" style="background-color:#9CB3FF">Instancia marzo</option>
              <option value="6" style="background-color:#9CB3FF">Nota final</option>
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
            <button type="button" class="btn btn-info btn-lg border border-#9CB3FF" style="background-color:#9CB3FF"><strong>Editar</strong></button>
            <button type="button" class="btn btn-info btn-lg border border-#9CB3FF" style="background-color:#9CB3FF"><strong>Guardar</strong></button>
          </p>
        </div>
      </div>
    </div>

  
    

	<?php include("modal/modal_alumno.php");?>
	<?php include("modal/modal_eliminar.php");?>
	<script src="js/script_alumno.js"></script>
 
  
  <?php include("footer.php");?>  
</body>
</html>