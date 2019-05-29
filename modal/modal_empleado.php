<div id="EmpleadoModal" class="modal fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<form name="frm_empleado" id="frm_empleado">
				<div class="modal-header">						
					<h4 id="titulo" class="modal-title">Agregar Nuevo Empleado</h4>
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				</div>
				<div class="modal-body">
					<div role="tabbable">
						<!-- Tab panes -->
						<ul class="nav nav-tabs" role="tablist">	
							<li  class="nav-item  active"><a class="nav-link active" href="#datos_empleadotab" aria-controls="datos_empleadotab" data-toggle="tab">Datos del Empleado</a>
							</li>
							<li   class="nav-item"><a class="nav-link"  href="#datos_personalestab" aria-controls="datos_personalestab"  data-toggle="tab">Datos Personales</a>
							</li>
						</ul>
						<div class="tab-content">
							<div role="tabpanel" class="tab-pane active" id="datos_empleadotab">
								<div class="container-fluid mt-2">	
									<div class="form-group">
										<label>Nombre/s</label>
										<input type="text" name="nombre" id="nombre" class="form-control" placeholder="Ingrese aquí el Nombre" maxlength="45" required>
									</div>
									<div class="form-group">
										<label>Apellido/s</label>
										<input type="text" name="apellido" id="apellido" class="form-control" placeholder="Ingrese aquí el Apellido" maxlength="45" required>
									</div>
									<div class="form-group">	
										<label>DNI</label>
										<input type="number" name="dni" id="dni" placeholder="Ingrese aquí el DNI" maxlength="11" class="form-control" required></div>
									
									<div class="form-group">
										<div class="form-row" >

											<div class="form-group col-md-6">
												<div class="form-group">
													<label>Fecha de Ingreso</label>
													<input type="date" name="fecha_de_ingreso" id="fecha_de_ingreso" class="form-control" required>
												</div>
											</div>
											<div class="form-group col-md-6">
												<div class="form-group">
													<label>Cargo</label>
													<select name="id_cargo" id="id_cargo" class="form-control" required>
														<option value="0">No hay datos</option>
													</select>
												</div>
											</div>
										</div>
									</div>
								</div>
								</div>
								<div role="tabpanel" class="tab-pane" id="datos_personalestab">
									<div class="container-fluid">
										<div class="form-group mt-2">
											<label>Fecha de Nacimiento</label>
											<input type="date" name="fecha_nacimiento" id="fecha_nacimiento" class="form-control">
										</div>			
										<div id="accordion" >
											<div class="card">
												<div class="card-header bg-info">
													<a class="card-link text-white" data-toggle="collapse" href="#collapseOne">Lugar de Nacimiento
	      												<i class='fas fa-angle-double-down float-right'></i>
        											</a>
												</div>
												<div id="collapseOne" class="collapse show" data-parent="#accordion">
													<div class="card-body">
														<div class="form-row" >

															<div class="form-group col-md-4">
																<label>Pais</label>
																<select name="id_pais" id="id_pais" class="form-control" required>
																	<option value="0">No hay datos</option>
																</select>
															</div>
															<div class="form-group col-md-4">
																<label>Provincia</label>
																<select name="id_provincia" id="id_provincia" class="form-control"  required>
																	<option value="0">No hay datos</option>
																</select>
															</div>
															<div class="form-group col-md-4">
																<label>Localidad</label>
																<select name="id_localidad" id="id_localidad" class="form-control"  required>
																	<option value="0">No hay datos</option>
																</select>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="form-group mt-2">
											<label>Sexo</label>
											<input type="radio" name="sexo" value="masculino" >Masculino
											<input type="radio" name="sexo" value="femenino" required>Femenino
										</div>
										<div class="form-group">
											<label>Estado Civil</label>
											<select name="id_estado_civil" id="id_estado_civil" class="form-control" required>
												<option value="0">No hay datos</option>
											</select>
										</div>
										<div id="accordion" >
											<div class="card">
												<div class="card-header bg-info">
													 <a class="card-link text-white" data-toggle="collapse" href="#collapseOne">Domicilio
	      												<i class='fas fa-angle-double-down float-right'></i>
        											</a>
												</div>
												<div id="collapseOne" class="collapse show" data-parent="#accordion">
													<div class="card-body">
														<div class="form-row" >

															<div class="form-group col-md-4">
																<label>Pais</label>
																<select name="id_pais_d" id="id_pais_d" class="form-control" required>
																	<option value="0">No hay datos</option>
																</select>
															</div>
															<div class="form-group col-md-4">
																<label>Provincia</label>
																<select name="id_provincia_d" id="id_provincia_d" class="form-control"  required>
																	<option value="0">No hay datos</option>
																</select>
															</div>
															<div class="form-group col-md-4">
																<label>Localidad</label>
																<select name="id_localidad_d" id="id_localidad_d" class="form-control"  required>
																	<option value="0">No hay datos</option>
																</select>
															</div>
														</div>
														<div class="form-group">
															<label>Barrio</label>
															<input type="text" name="barrio" id="barrio" class="form-control" placeholder="Ingrese aquí el Barrio" maxlength="45" required>
														</div>
														<div class="form-row" >
															<div class="form-group col-md-8">
																<div class="form-group">
																	<label>Calle</label>
																	<input type="text" name="calle" id="calle" class="form-control" placeholder="Ingrese aquí la Calle" maxlength="45" required>
																</div>
															</div>
															<div class="form-group col-md-4">
																<div class="form-group">
																	<label>Número</label>
																	<input type="number" name="numero" id="numero" class="form-control" placeholder="Ingrese aquí el Número" maxlength="4" required>
																</div>
															</div>
														</div>
												</div>
											</div>
										</div>
									</div>
									<div class="form-group">
										<label>Telefono</label>
										<input type="text" name="telefono" id="telefono" class="form-control" placeholder="Ingrese aquí el N° de Teléfono" maxlength="14" required>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			<div class="modal-footer">
				<input type="submit" class="btn btn-info" value="Guardar datos">
				<input type="button" class="btn btn-danger" data-dismiss="modal" value="Cancelar">	
			</div>
		</div>
	</form>
</div>
</div>
</div>