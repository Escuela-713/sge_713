<div id="addEmpleadoModal" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<form name="add_empleado" id="add_empleado">
					<div class="modal-header">						
						<h4 class="modal-title">Agregar nuevo empleado</h4>
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					</div>
					<div class="modal-body">					
						<div class="form-group">
							<label>Nombre</label>
							<input type="text" name="nombre" id="nombre" class="form-control" required>
							<label>Apellido</label>
							<input type="text" name="apellido" id="apellido" class="form-control" required>
							<label>Fecha de Ingreso</label>
							<input type="date" name="fecha_de_ingreso" id="fecha_de_ingreso" class="form-control" required>
							<label>Cargo</label>
							<select name="cargo" id="cargo" required>
       								 <?php
       								 include("ajax/conexion.php");
         							 $sql = mysqli_query($con, "CALL obtener_cargos();");
         							 if(mysqli_num_rows($sql) == 0){
										echo '<option value="0">No hay datos</option>';
										}
									 else{
         							 	while ($row = mysqli_fetch_assoc($sql)) {
            								echo '<option value="'.$row['id'].'">'.$row['nombre'].'</option>';
         								 }
         								}
         							mysql_close();
        							?>	
						 	</select>
							<div>
							<br>
							<b>
  							Sexo: <input type="radio" name="sexo" value="masculino">Masculino
  							<input type="radio" name="sexo" value="femenino" required>Femenino
  							</b>
							</div>
							<br>
							<label>Fecha de Nacimiento</label>
							<input type="date" name="fecha_nacimiento" id="fecha_nacimiento" class="form-control" required>
							<br>
							<label>Estado Civil</label>
							<select name="estado_civil" id="estado_civil" class="custom-select-sm" required>
								<option value="soltero" name="estado_civil">Soltero</option>
								<option value="casado" name="estado_civil">Casado</option>
								<option value="divorciado" name="estado_civil">Divorciado</option>
								<option value="viudo" name="estado_civil">Viudo</option>
							</select>
							<br>
							<label>Localidad</label>
							<select name="localidad" id="localidad" required>
       								 <?php
									 include("ajax/conexion.php");
         							 $sql = mysqli_query($con, "CALL obtener_localidades();");
         							 if(mysqli_num_rows($sql) == 0){
										echo '<option value="0">No hay datos</option>';
										}
									 else{
         							 	while ($row = mysqli_fetch_assoc($sql)) {
            								echo '<option value="'.$row['id'].'">'.$row['nombre'].'</option>';
         								 }
         								}
         							mysql_close();
        							?>	
						 	</select>
							<br>
							<label>Barrio</label>
							<input type="text" name="barrio" id="barrio" class="form-control" required>
							<label>Calle</label>
							<input type="text" name="calle" id="calle" class="form-control" required>
							<label>Numero</label>
							<input type="number" name="numero" id="numero" class="form-control" required>
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