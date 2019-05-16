<?php
include("ajax/conexion.php");
?>
<div id="editProvinciaModal" class="modal fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<form name="edit_provincia" id="edit_provincia">
				<div class="modal-header">						
					<h4 class="modal-title">Editar Provincia</h4>
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				</div>
				<div class="modal-body">					

					<div class="form-group">
						<label>Provincia</label>
						<input type="text" name="edit_name" id="edit_name" class="form-control" required>
						<input type="hidden" name="edit_id" id="edit_id">
					</div>

					<div class="form-group">
						<label>Pais</label>
						<select name="id_pais" id="id_pais">
							<?php
							$sql = mysqli_query($con, "call obtener_paises();");
							if(mysqli_num_rows($sql) == 0){
								echo '<option value="0">No hay datos</option>';
							}
							else{
								while ($row = mysqli_fetch_assoc($sql)) {
									echo '<option value="'.$row['id_pais'].'">'.$row['nombre'].'</option>';
								}
							}
							?>	
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