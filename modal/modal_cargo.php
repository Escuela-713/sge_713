<div id="CargoModal" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<form name="frm_cargo" id="frm_cargo">
					<div class="modal-header">						
						<h4 id="titulo" class="modal-title">Editar Cargo</h4>
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					</div>
					<div class="modal-body">					
						
						<div class="form-group">
							<label>Cargo</label>
							<input type="text" name="nombre" id="nombre" class="form-control" maxlength="45" placeholder="Ingrese aquí el Cargo" required>
							<input type="hidden" name="id" id="id">
						</div>
						<div class="form-group">
							<label>Descripción</label>
							<textarea  name="descripcion" id="descripcion" class="form-control" maxlength="150" placeholder="Ingrese aquí la Descripción"></textarea>
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
																																																											