<?php
include("php/conexion.php");
?>
<div id="addProvinciaModal" class="modal fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<form name="add_provincia" id="add_provincia">
				<div class="modal-header">						
					<h4 class="modal-title">Agregar Provincia</h4>
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				</div>
				<div class="modal-body">					
					<div class="form-group">
						<label>Provincia</label>
						<input type="text" name="nombre" id="nombre" class="form-control" placeholder="Ingrese aquí la Provincia" maxlength="45" required>
					</div>
					<div class="form-group">
						<label>Pais</label>
						<select name="id_pais" id="id_pais">
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