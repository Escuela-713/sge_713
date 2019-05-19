<?php 
require_once "ajax/db_pais.php";
require_once "ajax/db_provincia.php"
?>
<!-- Defino la ventana modal -->
<div id="addLocalidadModal" class="modal fade"  tabindex="-1" role="dialog">
	<div class="modal-dialog"   role="document">
		<div class="modal-content">
			<form id="add_localidad" name="add_localidad" method="post" enctype="multipart/form-data">
				<div class="modal-header">						
					<h4 class="modal-title">Agregar Localidad</h4>
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				</div>
				<div class="modal-body">

					<!-- Defino un grupo por cada dato que se va a representar en el formulario -->				

					<div class="form-group">
						<label>Localidad</label>
						<input type="text" name="name" id="name" class="form-control" required>
					</div>
					<div class="form-group">
						<label>Código Postal</label>
						<input type="number" name="cp" id="cp" class="form-control" >
					</div>
					<div class="form-group">
						<label>Pais</label>
						<select name="id_pais" id="id_pais" >
							<?php
							$obj=new pais();
							$sql=$obj->obtener_paises();
							if(mysqli_num_rows($sql) == 0)
							{
								echo '<option value="0">No hay datos</option>';
							}
							else
							{
								echo '<option value="0">Seleccione</option>';
								while ($row = mysqli_fetch_assoc($sql)) {
									echo '<option value="'.$row['id_pais'].'">'.$row['nombre'].'</option>';
								}
							}
							?>	
							</select>
						</div>
						<div class="form-group">
							<label>Provincia</label>
							<select name="id_provincia" id="id_provincia">
								<option value="0">No hay datos</option>
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
