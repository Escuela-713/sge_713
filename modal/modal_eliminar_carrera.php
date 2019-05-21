<div id="deleteCarreraModal" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<form name="delete_carrera" id="delete_carrera">
					<div class="modal-header">						
						<h4 class="modal-title">Eliminar Carrera</h4>
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					</div>
					<div class="modal-body">					
						<p>¿Seguro que quieres eliminar este registro?</p>
						<p class="text-warning"><small>Esta acción no se puede deshacer.</small></p>
						<input type="hidden" name="delete_id" id="delete_id">
					</div>
					<div class="modal-footer">
						<input type="submit" class="btn btn-info" value="Eliminar">
						<input type="button" class="btn btn-danger" data-dismiss="modal" value="Cancelar">
					</div>
				</form>
			</div>
		</div>
	</div>