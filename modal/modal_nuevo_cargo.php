<?php
include("ajax/conexion.php");
?>
<div id="addCargoModal" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<form name="add_cargo" id="add_cargo">
					<div class="modal-header">						
						<h4 class="modal-title">Agregar Cargo</h4>
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					</div>
					<div class="modal-body">					
						<div class="form-group">
							<label>Cargo</label>
							<input type="text" name="nombre" id="nombre" class="form-control" required>
						</div>			
						<div class="form-group">
							<label>Descripción</label>
							<textarea  name="descripcion" id="descripcion" class="form-control"></textarea>
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