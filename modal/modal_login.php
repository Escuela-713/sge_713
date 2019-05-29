<!-- Defino la ventana modal -->
<div id="Login" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<form name="add_pais" id="add_pais">
					<div class="modal-header">						
						<h4 class="modal-title">Iniciar Sesión</h4>
						<button  type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					</div>
					<div class="modal-body">
						<!-- Defino un grupo por cada dato que se va a representar en el formulario -->				
						<div class="form-group">
							<label>Nombre de Usuario</label>
							<input type="text" name="nombre_de_usuario" id="name" class="form-control" placeholder="Introduce tu nombre" required>
							<label>Contraseña</label>
							<input type="password" name="contraseña" class="form-control" required>
						</div>
					</div>
					<div class="modal-footer">
						<input type="submit" class="btn btn-info" value="Ingresar">
						<input type="button" class="btn btn-danger" data-dismiss="modal" value="Cancelar">	
					</div>
				</form>
			</div>
		</div>
	</div>