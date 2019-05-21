<div id="PaisModal" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<form name="frm_pais" id="frm_pais">
					<div class="modal-header">						
						<h4 id="titulo" class="modal-title">Editar Pais</h4>
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					</div>
					<div class="modal-body">					
						<div class="form-group">
							<label>Pais</label>
							<input type="text" name="name" id="name" class="form-control" maxlength="45" placeholder="Ingrese aquí el Pais" required>
							<input type="hidden" name="id" id="id">
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