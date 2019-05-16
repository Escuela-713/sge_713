<?php
include("conexion.php");
	
$action = (isset($_REQUEST['action'])&& $_REQUEST['action'] !=NULL)?$_REQUEST['action']:'';
if($action == 'ajax'){
	
	
	$query   = mysqli_query($con,"call obtener_orientaciones()");
		
	?>
		<div class="table-responsive">
			<table class="table table-striped table-hover">
				<thead>
					<tr>
						<th>Id Orientación</th>
						<th>Nombre</th>
						<th>Estado</th>
						<th>Plan</th>
						<th></th>
					</tr>
				</thead>
				<tbody>	
						<?php 
						
						while($row = mysqli_fetch_array($query)){	
							$orientacion_id=$row['id_orientacion'];
							$name=$row['nombre'];
							$estado=$row['estado'];
							$plan=$row['plan'];
							
						?>	
						<tr>
							<td ><?php echo $orientacion_id;?></td>
							<td ><?php echo $name;?></td>
							<td ><?php echo $estado;?></td>
							<td ><?php echo $plan;?></td>
							<td class = "text-right">
								<a href="#editOrientacionModal"  class="btn btn-info" data-target="#editOrientacionModal" class="edit" data-toggle="modal" data-id='<?php echo $orientacion_id;?>' data-name="<?php echo $name?>"><span class="glyphicon glyphicon-edit" ></span>Editar</a>
								<a href="#deleteOrientacionModal" class="btn btn-danger" class="delete" data-toggle="modal" data-id="<?php echo $orientacion_id;?>"><span class="glyphicon glyphicon-trash"  ></span>Eliminar</a>
                    		</td>
						</tr>
						<?php }?>
				</tbody>			
			</table>
		</div>	

	<?php	
}
?>          
		  
