<div id="addEmpleadoModal" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<form name="add_empleado" id="add_empleado">
					<div class="modal-header">						
						<h4 class="modal-title">Agregar Nuevo Empleado</h4>
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					</div>
					<div class="modal-body">					
						<div class="form-group">
							<label>Nombre</label>
							<input type="text" name="nombre" id="nombre" class="form-control" required>
							<label>Apellido</label>
							<input type="text" name="apellido" id="apellido" class="form-control" required>
						</div>
						<div class="form-group">
							<label>Fecha de Ingreso</label>
							<input type="date" name="fecha_de_ingreso" id="fecha_de_ingreso" class="form-control" required>
						</div>
						<div class="form-group">
							<label>Cargo</label>
							<select name="id_cargo" id="id_cargo" required>
       								<option value="0">No hay datos</option>
						 	</select>
						</div>
						<div class="form-group">
							<label>Sexo</label>
							<input type="radio" name="sexo" value="masculino">Masculino
  							<input type="radio" name="sexo" value="femenino" required>Femenino
						</div>	
  						<div class="form-group">
							<label>Fecha de Nacimiento</label>
							<input type="date" name="fecha_nacimiento" id="fecha_nacimiento" class="form-control" required>
						</div>
						<div class="form-group">
							<label>Estado Civil</label>
							<select name="id_estado_civil" id="id_estado_civil"  required>
								<option value="0">No hay datos</option>
							</select>
						</div>
						<div class="form-group">
							<label>Pais</label>
							<select name="id_pais" id="id_pais" required>
       							<option value="0">No hay datos</option>
						 	</select>
						</div>
						<div class="form-group">
							<label>Provincia</label>
							<select name="id_provincia" id="id_provincia" required>
       							<option value="0">No hay datos</option>
						 	</select>
						</div>
						<div class="form-group">
							<label>Localidad</label>
							<select name="id_localidad" id="id_localidad" required>
       							<option value="0">No hay datos</option>
						 	</select>
						 </div>
						 <div class="form-group">
							<label>Barrio</label>
							<input type="text" name="barrio" id="barrio" class="form-control" required>
						</div>
						<div class="form-group">
							<label>Calle</label>
							<input type="text" name="calle" id="calle" class="form-control" required>
						</div>
						<div class="form-group">
							<label>Numero</label>
							<input type="number" name="numero" id="numero" class="form-control" required>
						</div>
						<div class="form-group">
							<label>Telefono</label>
							<input type="text" name="telefono" id="telefono" class="form-control" required>
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