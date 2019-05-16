<div id="addOrientacionModal" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<form name="add_orientacion" id="add_orientacion">
					<div class="modal-header">						
						<h4 class="modal-title">Agregar Orientación</h4>
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					</div>
					<div class="modal-body">					
						<div class="form-group">
							<label>Orientacion</label>
							<input type="text" name="name" id="name" class="form-control" required>
						</div>		
						<div class="form-group">
							<label>Estado</label>
							<select name="estado" id="estado" required>
								<option value="0">Activo</option>
								<option value="1">Inactivo</option>
							</select>
						</div>
						<div class="form-group">
							<label>Plan</label>
					         <input type="number" name="plan" id="plan" required> 
						</div>
					</div>
					<div class="modal-footer">
						<input type="submit" class="btn btn-info" value="Guardar datos">
						<input type="button" class="btn btn-danger" data-dismiss="modal" value="Cancelar">	
					</div>
				</form>
			</div>
		</div>
	</div>