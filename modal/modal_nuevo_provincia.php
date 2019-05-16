<?php
include("ajax/conexion.php");
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
							<input type="text" name="name" id="name" class="form-control" required>
						</div>
						<div class="form-group">
							<label>Pais</label>
						 	<select name="pais" id="pais">
       								 <?php
         							 $sql = mysqli_query($con, "call obtener_paises();");
         							 if(mysqli_num_rows($sql) == 0){
										echo '<option value="0">No hay datos</option>';
										}
									 else{
         							 	while ($row = mysqli_fetch_assoc($sql)) {
            								echo '<option value="'.$row['id'].'">'.$row['nombre'].'</option>';
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