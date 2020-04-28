<div id="MateriasModal" class="modal fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<form name="frm_materia" id="frm_materia">
				<div class="modal-header">						
					<h4  name="titulo" id="titulo" class="title">Editar Materias por Plan</h4>
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				</div>
				<div class="modal-body">					
					<div class="form-group">
						<label>Materias</label>
						<input type="hidden" name="id" id="id">
						<select name="materias">
						  <option value="Matematicas">Matematicas</option>
						  <option value="Lengua">Lengua</option>
						  <option value="Historia">Historia</option>
						  <option value="Desarrollo">Desarrollo</option>
						</select>

					</div>		
					<div class="form-group">
						<label>Año</label>
						<input type="number" id="anio" name="anio" required placeholder="Ingrese el año">
						</select>
					</div>
					<div class="form-group">
						<label>Hs. Catedras Semanales</label>
						<input type="number" id="hs_semanales" name="hs_semanales" required placeholder="Ingrese las horas">
						</select>
					</div>
					<div class="form-group">
						<label>Hs. Reloj Anuales</label>
						<input type="number" id="hs_anuales" name="hs_anuales" required placeholder="Ingrese las horas">
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