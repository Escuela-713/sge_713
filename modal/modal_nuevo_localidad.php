<?php
include("ajax/conexion.php");
?>
<!-- Defino la ventana modal -->
<div id="addLocalidadModal" class="modal fade"  tabindex="-1" role="dialog">
		<div class="modal-dialog"   role="document">
			<div class="modal-content">
				<form id="frm_add_post" name="frm_add_post" method="post" enctype="multipart/form-data">
					<div class="modal-header">						
						<h4 class="modal-title">Agregar localidad</h4>
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
							<input type="number" name="cp" id="cp" class="form-control" required>
						</div>
						<div class="form-group">
							<label>Provincia</label>
						 	<select name="name_provincia" id="name_provincia">
       								 <?php
         							 $sql = mysqli_query($con, "CALL obtener_provincias();");
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
