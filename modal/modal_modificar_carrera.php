<div id="editCarreraModal" class="modal fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<form name="edit_carrera" id="edit_carrera">
				<div class="modal-header">						
					<h4 class="modal-title">Editar Carrera</h4>
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				</div>
				<div class="modal-body">					
					<div class="form-group">
						<label>Carrera</label>
						<input type="hidden" name="edit_id" id="edit_id">
						<input type="text" name="edit_name" id="edit_name" class="form-control" required>
					</div>		
					<div class="form-group">
						<label>Estado</label>
						<select name="edit_estado" id="edit_estado" required>
							<option value="0">Activo</option>
							<option value="1">Inactivo</option>
						</select>
					</div>
					<div class="form-group">
						<label>Plan</label>
						<input type="number" name="edit_plan" id="edit_plan" required> 
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