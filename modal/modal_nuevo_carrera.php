<div id="addCarreraModal" class="modal fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<form name="add_carrera" id="add_carrera">
				<div class="modal-header">						
					<h4 class="modal-title">Agregar Carrera</h4>
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				</div>
				<div class="modal-body">					
					<div class="form-group">
						<label>Carrera</label>
						<input type="text" name="name" id="name" class="form-control" placeholder="Ingrese aquí la Carrera" maxlength="45" required>
					</div>		
					<div class="form-group">
						<label>Estado</label>
						<select name="estado_id" id="estado_id" required>
							<option value="0">Activo</option>
							<option value="1">Inactivo</option>
						</select>
					</div>
					<div class="form-group">
						<label>Plan</label>
						<input type="number" name="plan" id="plan" placeholder="Ingrese aquí el Plan (año)"  maxlength="6" required> 
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