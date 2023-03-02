<div id="CursoModal" class="modal fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<form name="frm_curso" id="frm_curso">
				<div class="modal-header">						
					<h4  name="titulo" id="titulo" class="title">Nuevo Curso</h4>
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				</div>
				<div class="modal-body">					
					<div class="form-group">
						<label>Division</label>
						<input type="hidden" name="id" id="id">
						<input type="text" name="division" id="division" class="form-control"  maxlength="30" placeholder="Ingrese aquí la Division" required>
					</div>		
					<div class="form-group"
					    <label>Año</label>
					    <input type="hidden" name="id" id="id">
					    <input type="number" name="anio" id="anio" class="form-control" maxlength="4" placeholder="Ingrese aqui el año" required>
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