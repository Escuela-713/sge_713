<div id="MateriasModal" class="modal fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<form name="frm_materia" id="frm_materia">
				<div class="modal-header">						
					<h4  name="titulo" id="titulo" class="title">Editar Materias</h4>
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				</div>
				<div class="modal-body">					
					<div class="form-group">
						<input type="hidden" name="id" id="id">
						<label>Materias</label>
						<input type="text" name="name" id="name">
						
					</div>		
					<div class="form-group">
						<label>Descripción</label>
						<textarea name="descripcion" id="descripcion" rows="5" cols="30" placesholder="Escriba su descripción aquí..." ></textarea>
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