<div id="iniciarsesionModal" class="modal fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<form action="">
				<div class="modal-header">						
					<h4 class="title" id="titulo">Iniciar sesion</h4>
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				</div>
				<div class="modal-body">					
				
                <form action="" method="post" class="needs-validation" novalidate>


                    <div>
                        <label class="form-label" for="cuil">Cuil: </label>

                        <input class="form-control" type="tel" name="cuil" id="cuil" placeholder="Cuil" required minlength="11" maxlength="11" pattern=[0-9]{11}>

                        <div class="invalid-feedback">
                            El formato del cuil no es valido, por favor, intentelo de nuevo
                        </div>

                    </div>

                    <br> 
                    <br>

                    <div>

                        <label for="password" class="form-label">Contraseña:</label>
                        <input class="form-control" type="password" name="contraseña" id="contraseña" placeholder="Contraseña" required minlength="8" required>


                    </div>

                    <br>
                    <br>

				</div>

				<div class="modal-footer">
					<input type="submit" class="btn btn-info" value="Registrar">
					<input type="button" class="btn btn-danger" data-dismiss="modal" value="Cancelar">
				</div>
            </form>
		</div>
	</div>
</div>