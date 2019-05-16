<div id="editOrientacionModal" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<form name="edit_orientacion" id="edit_orientacion">
					<div class="modal-header">						
						<h4 class="modal-title">Editar Orientacion</h4>
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					</div>
					<div class="modal-body">					
						
						<div class="form-group">
							<label>Orientación</label>
							<input type="text" name="edit_name" id="edit_name" class="form-control" required>
							<input type="hidden" name="edit_id" id="edit_id">
						</div>
						<div class="form-group">
							<label>Estado</label>
							<select name="Etado" id="Estado">
								<option value="0">Activo</option>
								<option value="1">Inactivo</option>
						</select>
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