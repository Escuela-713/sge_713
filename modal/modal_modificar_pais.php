<div id="editPaisModal" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<form name="edit_pais" id="edit_pais">
					<div class="modal-header">						
						<h4 class="modal-title">Editar Pais</h4>
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					</div>
					<div class="modal-body">					
						
						<div class="form-group">
							<label>Pais</label>
							<input type="text" name="edit_name" id="edit_name" class="form-control" maxlength="45" required>
							<input type="hidden" name="edit_id" id="edit_id">
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