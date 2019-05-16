<div id="editCargoModal" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<form name="edit_cargo" id="edit_cargo">
					<div class="modal-header">						
						<h4 class="modal-title">Editar Cargo</h4>
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					</div>
					<div class="modal-body">					
						
						<div class="form-group">
							<label>Cargo</label>
							<input type="text" name="edit_name" id="edit_name" class="form-control" required>							
							<input type="hidden" name="edit_id" id="edit_id">
						</div>
						<div class="form-group">
							<label>Descripción</label>
							<textarea  name="edit_descripcion" id="edit_descripcion" class="form-control"></textarea>
						</div>
					</div>
						<div class="modal-footer">
							<input type="submit" class="btn btn-info" value="Guardar">
							<input type="button" class="btn btn-danger" data-dismiss="modal" value="Cancelar">	
							
						</div>			
					
				</form>
			</div>
		</div>
	</div>
																																																											