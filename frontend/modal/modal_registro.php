<div id="registroModal" class="modal fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<form action="">
				<div class="modal-header">						
					<h4 class="title" id="titulo">Registráte</h4>
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				</div>
				<div class="modal-body">					
				
                <form action="" method="post" class="needs-validation" novalidate>


                    <div>
        

    <div class="row">
        <div class="col mb-4">
            <form  action="" method="post">
                <div class="form-group">
                    <label for="nombre" >Nombre:</label>
                    <input type="text" name="nombre" id="nombre" required maxlength="30" class="form-control" placeholder="Ingrese su nombre">
                </div>
        </div>
            <div class="col mb-4">
            <label for="apellido">Apellido:</label>
            <input type="text"  name="apellido" id="apellido" required maxlength="30" class="form-control" placeholder="Ingrese un apellido">
        </div>
        
    </div>

    <div class="row">
        <div class="col mb-4">
            <label for="correo">Correo electronico:</label>
            
            <input type="email" name="correo" id="correo" required class="form-control" placeholder="Ingrese correo electronico">
        </div>

        <div class="col mb-4">
            <label for="correo_2">Confirmar correo:</label>
            <input type="email" name="correo_2" id="usuario" class="form-control" required placeholder="Ingrese correo electronico">
        </div>
    </div>

    <div class="row">
        <div class="col mb-4">
            <label for="dni">DNI</label>
            <input type="tel" name="dni" id="dni" required placeholder="Ingrese su DNI" class="form-control">
        </div>

        <div class="col mb-4">
            <label for="cuil">Cuil</label>
            <input type="tel" name="cuil" id="cuil" required minlength="11" maxlength="11" required class="form-control" placeholder="Ingrese su Cuil">
        </div>

    </div>
    <div class="row">

        <div class="col mb-4">
            <label for="password" >Contraseña:</label>
            <input type="password" name="password" id="password" class="form-control" required minlength="8" required placeholder="Ingrese su contraseña">
        </div>
        
        <div class="col mb-4">
            <label for="password_2" >Confirmar Contraseña:</label>
            <input type="password" name="password_2" id="contraseña_2" required minlength="8"  class="form-control" placeholder="Ingrese su contraseña">
        </div>
        
    </div>
        
        <label for="fecha_nac">Fecha nacimiento:</label>
        <input type="date" name="fecha_nac" id="fecha_nac" min="12-12-1932" class="form-control" minlength="01-01-2005" min="2005-01-01"> 
    
        
        <br>
        
        <br>

            
            <h2>Genero:</h2>
        
            <label class="form-check-label" for="genero">Femenino</label>
            <input class="form-check-input" type="radio" name="genero" id="genero">
            
            <br>
            
            <label class="form-check-label" for="genero_2">Masculino</label>
            <input class="form-check-input" type="radio" name="genero" id="genero_2">

        
        </form>

        <link rel="stylesheet" href="boostrap/bootstrap/js/bootstrap.bundle.js">
				</div>
				<div class="modal-footer">
					<input type="submit" class="btn btn-info" value="Ingresar">
					<input type="button" class="btn btn-danger" data-dismiss="modal" value="Cancelar">
				</div>
            </form>
		</div>
	</div>
</div>