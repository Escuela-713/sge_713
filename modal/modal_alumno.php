<div id="AlumnoModal" class="modal fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<form name="frm_alumno" id="frm_alumno" action="" class="container g-3 needs-validation" novalidate>
				<div class="modal-header">						
					<h4 id="titulo" name="titulo" class="modal-title">Agregar Nuevo Alumno</h4>
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				</div>
				<div class="modal-body">
					<div role="tabbable">
						<!-- Tab panes -->
						<ul class="nav nav-tabs" role="tablist">	
							<li  class="nav-item active"><a class="nav-link active" href="#datos_alumnotab" aria-controls="datos_alumnotab" data-toggle="tab">Datos Alumno</a>
							</li>
							<li   class="nav-item"><a class="nav-link"  href="#datos_personalestab" aria-controls="datos_personalestab"  data-toggle="tab">Datos Personales</a>
							</li>
							<li   class="nav-item"><a class="nav-link"  href="#datos_tutorestab" aria-controls="datos_tutorestab"  data-toggle="tab">Datos Tutores</a>
							</li>
						</ul>
						<div  class="tab-content">
							<div role="tabpanel" class="tab-pane" id="datos_tutorestab">
								<div class="container-fluid">
									<ul class="nav nav-tabs" role="tablist">	
										<li class="nav-item active"><a class="nav-link active" href="#datos_madretab" aria-controls="datos_madretab" data-toggle="tab">Madre</a>
									    </li>
										<li   class="nav-item"><a class="nav-link"  href="#datos_padretab" aria-controls="datos_padretab"  data-toggle="tab">Padre</a>
							            </li>
										<li   class="nav-item"><a class="nav-link"  href="#datos_tutortab" aria-controls="datos_tutortab"  data-toggle="tab">Tutor</a>
									     </li>
						             </ul>
									<div class="tab-content">
										<div role="tabpanel" class="tab-pane" id="datos_tutortab">
											<div class="container-fluid mt-2">
													<input type="hidden" name="id" id="id"> 
													<div class="form-group">
														<label>Nombre/s</label>
														<input type="text" name="nombre" id="nombre" class="form-control" placeholder="Ingrese aquí el Nombre" maxlength="45" required>
														<div class="invalid-feedback">
															Ingrese el nombre
														</div>
													</div>
													<div class="form-group">
														<label>Apellido/s</label>
														<input type="text" name="apellido" id="apellido" class="form-control" placeholder="Ingrese aquí el Apellido" maxlength="45" required>
														<div class="invalid-feedback">
															Ingrese el apellido
														</div>
													</div>
													<div class="form-group">	
														<label>DNI</label>
														<input type="number" name="dni" id="dni" placeholder="Ingrese aquí el DNI" maxlength="11" class="form-control" required>
															<div class="invalid-feedback">
																Ingrese el DNI
															</div>
													</div>
													<div class="form-group">	
														<label>CUIL</label>
														<input type="number" name="cuil" id="cuil" placeholder="Ingrese aquí el Cuil" maxlength="11" class="form-control" required>
														<div class="invalid-feedback">
															Ingrese el CUIL
													</div>
													<div class="form-group">
														<label>Nro. de telefono</label>
														<input type="text" name="telefono" id="telefono" class="form-control" placeholder="Ingrese aquí el N° de Teléfono" maxlength="14" required>
														<div class="invalid-feedback">
															Ingrese el numero de telefono
														</div>
													</div>
													<div class="form-group">
														<label>Género</label>
														<input type="radio" name="sexo" value="F" required checked="true">Femenino
														<input type="radio" name="sexo" value="M" >Masculino
														<input type="radio" name="sexo" value="O" >Otro	
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
																		<select name="id_pais_d_tutores" id="id_pais_d_tutores" class="form-control" >
																			<option value="0" required>No hay datos</option>
																		</select>
																	</div>
																	<div class="form-group col-md-4">
																		<label>Provincia</label>
																		<select name="id_provincia_d_tutores" id="id_provincia_d_tutores" class="form-control"  >
																			<option value="0">No hay datos</option>
																		</select>
																	</div>
																	<div class="form-group col-md-4">
																		<label>Localidad</label>
																		<select name="id_localidad_d_tutores" id="id_localidad_d_tutores" class="form-control"  >
																			<option value="0">No hay datos</option>
																		</select>
																	</div>
																</div>
																	<div class="form-group">
																	<label>Barrio</label>
																	<input type="text" name="barrio" id="barrio" class="form-control" placeholder="Ingrese aquí el Barrio" maxlength="45" required >
																	<div class="invalid-feedback">
																		Ingrese el barrio
																	</div>
																</div>
																<div class="form-row" >
																	<div class="form-group col-md-8">
																		<div class="form-group">
																			<label>Calle</label>
																			<input type="text" name="calle" id="calle" class="form-control" placeholder="Ingrese aquí la Calle" maxlength="45" required >
																			<div class="invalid-feedback">
																				Ingrese la calle
																			</div>
																		</div>
																	</div>
																	<div class="form-group col-md-4">
																		<div class="form-group">
																			<label>Número</label>
																			<input type="number" name="numero" id="numero" class="form-control" placeholder="Ingrese aquí el Número" maxlength="4" required>
																			<div class="invalid-feedback">
																				Ingrese el numero
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div class="form-group">
													<label>Fecha de Nacimiento</label>
													<input type="date" name="fecha_de_nacimiento" id="fecha_de_nacimiento" class="form-control" required>
													<div class="invalid-feedback">
														Ingrese la fecha de nacimiento
													</div>
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
																		<select name="id_pais_tutores" id="id_pais_tutores" class="form-control">
																			<option value="0">No hay datos</option>
																		</select>
																	</div>
																	<div class="form-group col-md-4">
																		<label>Provincia</label>
																		<select name="id_provincia_tutores" id="id_provincia_tutores" class="form-control"  >
																			<option value="0">No hay datos</option>
																		</select>
																	</div>
																	<div class="form-group col-md-4">
																		<label>Localidad</label>
																		<select name="id_localidad_tutores" id="id_localidad_tutores" class="form-control"  >
																			<option value="0">No hay datos</option>
																		</select>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div class="form-group">
													<label>Estado Civil</label>
													<select name="id_estado_civil_tutor" id="id_estado_civil_tutor" class="form-control">
														<option value="0">No hay datos</option>
													</select>
												</div>
												<div class="form-group">
													<label>Profesión</label>
													<input type="text" name="profesion" id="profesion" class="form-control" placeholder="Ingrese aquí la profesion" maxlength="45" required>
													<div class="invalid-feedback">
														Ingrese una profesión
													</div>
												</div>
												<div class="form-group">
													<label>Lugar de trabajo</label>
													<input type="text" name="lugar_trabajo" id="lugar_trabajo" class="form-control" placeholder="Ingrese aquí el lugar de trabajo" maxlength="45" required>
													<div class="invalid-feedback">
														Ingrese un lugar de trabajo
													</div>
												</div>
											</div>
										</div>
									</div>
										 
										<div role="tabpanel" class="tab-pane active" id="datos_madretab">
											<div class="container-fluid mt-2">
												<input type="hidden" name="id" id="id"> 
										 		<div class="form-group">
													<label>Nombre/s</label>
													<input type="text" name="nombre" id="nombre" class="form-control" placeholder="Ingrese aquí el Nombre" maxlength="45" required>
													<div class="invalid-feedback">
														Ingrese el nombre
													</div>
												</div>
												<div class="form-group">
													<label>Apellido/s</label>
													<input type="text" name="apellido" id="apellido" class="form-control" placeholder="Ingrese aquí el Apellido" maxlength="45" required>
													<div class="invalid-feedback">
														Ingrese el apellido
													</div>
												</div>
												<div class="form-group">	
													<label>DNI</label>
													<input type="number" name="dni" id="dni" placeholder="Ingrese aquí el DNI" maxlength="11" class="form-control" required>
														<div class="invalid-feedback">
															Ingrese el DNI
														</div>
												</div>
												<div class="form-group">	
													<label>CUIL</label>
													<input type="number" name="cuil" id="cuil" placeholder="Ingrese aquí el Cuil" maxlength="11" class="form-control" required>
													<div class="invalid-feedback">
														Ingrese el CUIL
												</div>
												<div class="form-group">
													<label>Nro. de telefono</label>
													<input type="text" name="telefono" id="telefono" class="form-control" placeholder="Ingrese aquí el N° de Teléfono" maxlength="14" required>
													<div class="invalid-feedback">
														Ingrese el numero de telefono
													</div>
												</div>
												<div class="form-group">
													<label>Género</label>
													<input type="radio" name="sexo" value="F" required checked="true">Femenino
													<input type="radio" name="sexo" value="M" >Masculino
													<input type="radio" name="sexo" value="O" >Otro	
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
																	<select name="id_pais_d_tutores" id="id_pais_d_tutores" class="form-control" >
																		<option value="0" required>No hay datos</option>
																	</select>
																</div>
																<div class="form-group col-md-4">
																	<label>Provincia</label>
																	<select name="id_provincia_d_tutores" id="id_provincia_d_tutores" class="form-control"  >
																		<option value="0">No hay datos</option>
																	</select>
																</div>
																<div class="form-group col-md-4">
																	<label>Localidad</label>
																	<select name="id_localidad_d_tutores" id="id_localidad_d_tutores" class="form-control"  >
																		<option value="0">No hay datos</option>
																	</select>
																</div>
															</div>
																<div class="form-group">
																<label>Barrio</label>
																<input type="text" name="barrio" id="barrio" class="form-control" placeholder="Ingrese aquí el Barrio" maxlength="45" required >
																<div class="invalid-feedback">
																	Ingrese el barrio
																</div>
															</div>
															<div class="form-row" >
																<div class="form-group col-md-8">
																	<div class="form-group">
																		<label>Calle</label>
																		<input type="text" name="calle" id="calle" class="form-control" placeholder="Ingrese aquí la Calle" maxlength="45" required >
																		<div class="invalid-feedback">
																			Ingrese la calle
																		</div>
																	</div>
																</div>
																<div class="form-group col-md-4">
																	<div class="form-group">
																		<label>Número</label>
																		<input type="number" name="numero" id="numero" class="form-control" placeholder="Ingrese aquí el Número" maxlength="4" required>
																		<div class="invalid-feedback">
																			Ingrese el numero
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div class="form-group">
												<label>Fecha de Nacimiento</label>
												<input type="date" name="fecha_de_nacimiento" id="fecha_de_nacimiento" class="form-control" required>
												<div class="invalid-feedback">
													Ingrese la fecha de nacimiento
												</div>
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
																	<select name="id_pais_tutores" id="id_pais_tutores" class="form-control">
																		<option value="0">No hay datos</option>
																	</select>
																</div>
																<div class="form-group col-md-4">
																	<label>Provincia</label>
																	<select name="id_provincia_tutores" id="id_provincia_tutores" class="form-control"  >
																		<option value="0">No hay datos</option>
																	</select>
																</div>
																<div class="form-group col-md-4">
																	<label>Localidad</label>
																	<select name="id_localidad_tutores" id="id_localidad_tutores" class="form-control"  >
																		<option value="0">No hay datos</option>
																	</select>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div class="form-group">
												<label>Estado Civil</label>
												<select name="id_estado_civil_madre" id="id_estado_civil_madre" class="form-control">
													<option value="0">No hay datos</option>
												</select>
											</div>
											<div class="form-group">
												<label>Profesión</label>
												<input type="text" name="profesion" id="profesion" class="form-control" placeholder="Ingrese aquí la profesion" maxlength="45" required>
												<div class="invalid-feedback">
													Ingrese una profesión
												</div>
											</div>
											<div class="form-group">
												<label>Lugar de trabajo</label>
												<input type="text" name="lugar_trabajo" id="lugar_trabajo" class="form-control" placeholder="Ingrese aquí el lugar de trabajo" maxlength="45" required>
												<div class="invalid-feedback">
													Ingrese un lugar de trabajo
												</div>
											</div>
										</div>
									</div>
								</div>
										
										<div role="tabpanel" class="tab-pane" id="datos_padretab">
											<div class="container-fluid mt-2">
														<input type="hidden" name="id" id="id"> 
														<div class="form-group">
															<label>Nombre/s</label>
															<input type="text" name="nombre" id="nombre" class="form-control" placeholder="Ingrese aquí el Nombre" maxlength="45" required>
															<div class="invalid-feedback">
																Ingrese el nombre
															</div>
														</div>
														<div class="form-group">
															<label>Apellido/s</label>
															<input type="text" name="apellido" id="apellido" class="form-control" placeholder="Ingrese aquí el Apellido" maxlength="45" required>
															<div class="invalid-feedback">
																Ingrese el apellido
															</div>
														</div>
														<div class="form-group">	
															<label>DNI</label>
															<input type="number" name="dni" id="dni" placeholder="Ingrese aquí el DNI" maxlength="11" class="form-control" required>
																<div class="invalid-feedback">
																	Ingrese el DNI
																</div>
														</div>
														<div class="form-group">	
															<label>CUIL</label>
															<input type="number" name="cuil" id="cuil" placeholder="Ingrese aquí el Cuil" maxlength="11" class="form-control" required>
															<div class="invalid-feedback">
																Ingrese el CUIL
														</div>
														<div class="form-group">
															<label>Nro. de telefono</label>
															<input type="text" name="telefono" id="telefono" class="form-control" placeholder="Ingrese aquí el N° de Teléfono" maxlength="14" required>
															<div class="invalid-feedback">
																Ingrese el numero de telefono
															</div>
														</div>
														<div class="form-group">
															<label>Género</label>
															<input type="radio" name="sexo" value="F" required checked="true">Femenino
															<input type="radio" name="sexo" value="M" >Masculino
															<input type="radio" name="sexo" value="O" >Otro	
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
																			<select name="id_pais_d_tutores" id="id_pais_d_tutores" class="form-control" >
																				<option value="0" required>No hay datos</option>
																			</select>
																		</div>
																		<div class="form-group col-md-4">
																			<label>Provincia</label>
																			<select name="id_provincia_d_tutores" id="id_provincia_d_tutores" class="form-control"  >
																				<option value="0">No hay datos</option>
																			</select>
																		</div>
																		<div class="form-group col-md-4">
																			<label>Localidad</label>
																			<select name="id_localidad_d_tutores" id="id_localidad_d_tutores" class="form-control"  >
																				<option value="0">No hay datos</option>
																			</select>
																		</div>
																	</div>
																		<div class="form-group">
																		<label>Barrio</label>
																		<input type="text" name="barrio" id="barrio" class="form-control" placeholder="Ingrese aquí el Barrio" maxlength="45" required >
																		<div class="invalid-feedback">
																			Ingrese el barrio
																		</div>
																	</div>
																	<div class="form-row" >
																		<div class="form-group col-md-8">
																			<div class="form-group">
																				<label>Calle</label>
																				<input type="text" name="calle" id="calle" class="form-control" placeholder="Ingrese aquí la Calle" maxlength="45" required >
																				<div class="invalid-feedback">
																					Ingrese la calle
																				</div>
																			</div>
																		</div>
																		<div class="form-group col-md-4">
																			<div class="form-group">
																				<label>Número</label>
																				<input type="number" name="numero" id="numero" class="form-control" placeholder="Ingrese aquí el Número" maxlength="4" required>
																				<div class="invalid-feedback">
																					Ingrese el numero
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
													<div class="form-group">
														<label>Fecha de Nacimiento</label>
														<input type="date" name="fecha_de_nacimiento" id="fecha_de_nacimiento" class="form-control" required>
														<div class="invalid-feedback">
															Ingrese la fecha de nacimiento
														</div>
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
																			<select name="id_pais_tutores" id="id_pais_tutores" class="form-control">
																				<option value="0">No hay datos</option>
																			</select>
																		</div>
																		<div class="form-group col-md-4">
																			<label>Provincia</label>
																			<select name="id_provincia_tutores" id="id_provincia_tutores" class="form-control"  >
																				<option value="0">No hay datos</option>
																			</select>
																		</div>
																		<div class="form-group col-md-4">
																			<label>Localidad</label>
																			<select name="id_localidad_tutores" id="id_localidad_tutores" class="form-control"  >
																				<option value="0">No hay datos</option>
																			</select>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
													<div class="form-group">
														<label>Estado Civil</label>
														<select name="id_estado_civil_padre" id="id_estado_civil_padre" class="form-control">
															<option value="0">No hay datos</option>
														</select>
													</div>
													<div class="form-group">
														<label>Profesión</label>
														<input type="text" name="profesion" id="profesion" class="form-control" placeholder="Ingrese aquí la profesion" maxlength="45" required>
														<div class="invalid-feedback">
															Ingrese una profesión
														</div>
													</div>
													<div class="form-group">
														<label>Lugar de trabajo</label>
														<input type="text" name="lugar_trabajo" id="lugar_trabajo" class="form-control" placeholder="Ingrese aquí el lugar de trabajo" maxlength="45" required>
														<div class="invalid-feedback">
															Ingrese un lugar de trabajo
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div role="tabpanel" class="tab-pane active" id="datos_alumnotab">
								<div class="container-fluid mt-2">
									<input type="hidden" name="id" id="id">
									<div class="form-group">
										<label>Nombre/s</label>
										<input type="text" name="nombre" id="nombre" class="form-control" placeholder="Ingrese aquí el Nombre" maxlength="45" required>
										<div class="invalid-feedback">
											Ingrese el nombre
										</div>
									</div>
									<div class="form-group">
										<label>Apellido/s</label>
										<input type="text" name="apellido" id="apellido" class="form-control" placeholder="Ingrese aquí el Apellido" maxlength="45" required>
										<div class="invalid-feedback">
											Ingrese el apellido
										</div>
									</div>
									<div class="form-group">	
										<label>DNI</label>
										<input type="number" name="dni" id="dni" placeholder="Ingrese aquí el DNI" maxlength="11" class="form-control" required>
										<div class="invalid-feedback">
											Ingrese el DNI
										</div>
									</div>
                                    <div class="form-group">	
										<label>CUIL</label>
										<input type="number" name="cuil" id="cuil" placeholder="Ingrese aquí el Cuil" maxlength="11" class="form-control" required>
										<div class="invalid-feedback">
											Ingrese el CUIL
										</div>
									</div>
									<div class="form-group">
										<label> Carrera</label>
									<select class="form-select" aria-label="Default select example">
										<option selected>Seleccione la carrera</option>
										<option value="1">ETP</option>
										<option value="2">Comunicaciones</option>
										<option value="3">Humanidades</option>
									</select>
									</div>
									
                                    
									<div class="form-group">
										<div class="form-row" >
											<div class="form-group col-md-6">
												<div class="form-group">
													<label>Numero de Legajo</label>
													<input type="number" name="legajo" id="legajo" class="form-control"  placeholder="Ingrese aquí el Legajo" required>
													<div class="invalid-feedback">
														Ingrese el numero de legajo
													</div>
												</div>
											</div>
											<div class="form-group col-md-6">
												<div class="form-group">
													<label>Fecha de Ingreso</label>
													<input type="date" name="fecha_de_ingreso" id="fecha_de_ingreso" class="form-control" required>
													<div class="invalid-feedback">
														Ingrese la fecha de ingreso
													</div>
												</div>
											</div>
                                            <div class="form-group col-md-6">
												<div class="form-group">
													<label>Nro. libro matriz</label>
													<input type="number" name="matriz" id="matriz" class="form-control"  placeholder="Ingrese aquí el n de libro matriz" required>
													<div class="invalid-feedback">
														Ingrese el numero de matriz
													</div>
												</div>
											</div>
                                            <div class="form-group col-md-6">
												<div class="form-group">
													<label>Fecha de Egreso</label>
													<input type="date" name="fecha_de_egreso" id="fecha_de_egreso" class="form-control">
													
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
											<input type="date" name="fecha_de_nacimiento" id="fecha_de_nacimiento" class="form-control" required>
											<div class="invalid-feedback">
												Ingrese la fecha de nacimiento
											</div>
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
																<select name="id_pais" id="id_pais" class="form-control">
																	<option value="0">No hay datos</option>
																</select>
															</div>
															<div class="form-group col-md-4">
																<label>Provincia</label>
																<select name="id_provincia" id="id_provincia" class="form-control"  >
																	<option value="0">No hay datos</option>
																</select>
															</div>
															<div class="form-group col-md-4">
																<label>Localidad</label>
																<select name="id_localidad" id="id_localidad" class="form-control"  >
																	<option value="0">No hay datos</option>
																</select>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="form-group mt-2">
											<label>Género</label>
											<input type="radio" name="sexo" value="F" required checked="true">Femenino
											<input type="radio" name="sexo" value="M" >Masculino
											<input type="radio" name="sexo" value="O" >Otro	
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
																<select name="id_pais_d" id="id_pais_d" class="form-control" >
																	<option value="0" required>No hay datos</option>
																</select>
															</div>
															<div class="form-group col-md-4">
																<label>Provincia</label>
																<select name="id_provincia_d" id="id_provincia_d" class="form-control"  >
																	<option value="0">No hay datos</option>
																</select>
															</div>
															<div class="form-group col-md-4">
																<label>Localidad</label>
																<select name="id_localidad_d" id="id_localidad_d" class="form-control"  >
																	<option value="0">No hay datos</option>
																</select>
															</div>
														</div>
														<div class="form-group">
															<label>Barrio</label>
															<input type="text" name="barrio" id="barrio" class="form-control" placeholder="Ingrese aquí el Barrio" maxlength="45" required >
															<div class="invalid-feedback">
																Ingrese el barrio
															</div>
														</div>
														<div class="form-row" >
															<div class="form-group col-md-8">
																<div class="form-group">
																	<label>Calle</label>
																	<input type="text" name="calle" id="calle" class="form-control" placeholder="Ingrese aquí la Calle" maxlength="45" required >
																	<div class="invalid-feedback">
																		Ingrese la calle
																	</div>
																</div>
															</div>
															<div class="form-group col-md-4">
																<div class="form-group">
																	<label>Número</label>
																	<input type="number" name="numero" id="numero" class="form-control" placeholder="Ingrese aquí el Número" maxlength="4" required>
																	<div class="invalid-feedback">
																		Ingrese el numero
																	</div>
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
										<div class="invalid-feedback">
											Ingrese el numero de telefono
										</div>
									</div>
									<div class="form-group">
										<label>Email del alumno</label>
										<input type="text" name="email_alumno" id="email_alumno" class="form-control" placeholder="Ingrese aquí el mail del alumno" maxlength="45" required >
										<div class="invalid-feedback">
											Ingrese el mail del alumno
										</div>
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
<script>// Example starter JavaScript for disabling form submissions if there are invalid fields
        (function () {
          'use strict'
        
          // Fetch all the forms we want to apply custom Bootstrap validation styles to
          var forms = document.querySelectorAll('.needs-validation')
        
          // Loop over them and prevent submission
          Array.prototype.slice.call(forms)
            .forEach(function (form) {
              form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                  event.preventDefault()
                  event.stopPropagation()
                }
        
                form.classList.add('was-validated')
              }, false)
            })
        })()</script>