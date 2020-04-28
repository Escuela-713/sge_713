<div id="InstanciasModal" class="modal fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<form name="frm_instancias" id="frm_instancias">
				<div class="modal-header">						
					<h4  name="titulo" id="titulo" class="title">Nueva Instancia</h4>
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				</div>
				<div class="modal-body">					
					<div class="form-group">
						<label>Instancia</label>
						<input type="hidden" name="id" id="id">
						<input type="text" name="instancia" id="instancia" class="form-control"  maxlength="30" placeholder="Ingrese aquí la Instancia" required>
					</div>		
				<div class="modal-footer">
					<input type="submit" class="btn btn-info" value="Guardar datos">
					<input type="button" class="btn btn-danger" data-dismiss="modal" value="Cancelar">	
				</div>
			</form>
		</div>
	</div>
</div>