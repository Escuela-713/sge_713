<div id="LocalidadModal" class="modal fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<form name="frm_localidad" id="frm_localidad">
				<div class="modal-header">						
					<h4 class="title" id="titulo">Editar Localidad</h4>
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				</div>
				<div class="modal-body">					
					<div class="form-group">
						<label>Localidad</label>
						<input type="text" name="name" id="name" class="form-control" maxlength="45" placeholder="Ingrese aquí la Localidad" required>
						<input type="hidden" name="id" id="id">
					</div>
					<div class="form-group">
						<label>Código Postal</label>
						<input type="number" name="cp" id="cp" maxlength="6" placeholder="Ingrese aquí el Código Postal" >
					</div>
					<div class="form-group">
						<label>Pais</label>
						<select name="id_pais" id="id_pais" >
							<option value="0">No hay datos</option>;
						</select>
					</div>
					<div class="form-group">
						<label>Provincia</label>
						<select name="id_provincia" id="id_provincia">
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