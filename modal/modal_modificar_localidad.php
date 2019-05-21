<div id="editLocalidadModal" class="modal fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<form name="edit_localidad" id="edit_localidad">
				<div class="modal-header">						
					<h4 class="modal-title">Editar Localidad</h4>
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				</div>
				<div class="modal-body">					

					<div class="form-group">
						<label>Localidad</label>
						<input type="text" name="edit_name" id="edit_name" class="form-control" maxlength="45" required>
						<input type="hidden" name="edit_id" id="edit_id">
					</div>

					<div class="form-group">
						<label>Código Postal</label>
						<input type="text" name="edit_cp" id="edit_cp" maxlength="6" >
					</div>

					<div class="form-group">
						<label>Pais</label>
						<select name="id_pais_m" id="id_pais_m" >
							<option value="0">No hay datos</option>;
						</select>
					</div>
					<div class="form-group">
						<label>Provincia</label>
						<select name="id_provincia_m" id="id_provincia_m">
							<option value="0">No hay datos</option>;
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