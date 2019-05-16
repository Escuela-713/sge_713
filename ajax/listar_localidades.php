<?php
include("conexion.php");
	
$action = (isset($_REQUEST['action'])&& $_REQUEST['action'] !=NULL)?$_REQUEST['action']:'';
if($action == 'ajax'){
	
	
	$query   = mysqli_query($con,"call obtener_localidades()");
		
	?>
		<div class="table-responsive">
			<table class="table table-striped table-hover">
				<thead>
					<tr>
						<th>Id Localidad</th>
						<th>Nombre</th>
						<th>Codigo postal</th>
						<th>Nombre provincia</th>
						<th></th>
					</tr>
				</thead>
				<tbody>	
						<?php 
						$finales=0;
						while($row = mysqli_fetch_array($query)){	
							$localidad_id=$row['id_localidad'];
							$localidad_name=$row['nombre'];
							$localidad_codigo_postal=$row['codigo_postal'];
							$localidad_id_provincia=$row['provincia'];
							$finales++;
						?>	
						<tr>
							<td ><?php echo $localidad_id;?></td>
							<td ><?php echo $localidad_name;?></td>
							<td><?php echo $localidad_codigo_postal;?></td>
							<td><?php echo $localidad_id_provincia;?></td>
							<td class = "text-right">
								<a href="#"  class="btn btn-info" data-target="#editLocalidadModal" class="edit" data-toggle="modal" data-id='<?php echo $localidad_id;?>' data-name="<?php echo $localidad_name?>"><span class="glyphicon glyphicon-edit" >Editar</span> </a>
								<a href="#deleteLocalidadModal" class="btn btn-danger" class="delete" data-toggle="modal" data-id="<?php echo $pais_id;?>"><span class="glyphicon glyphicon-trash"  >Eliminar</span></a>
                    		</td>
						</tr>
						<?php }?>
				</tbody>			
			</table>
		</div>	

	
	
	<?php	
		
}
?>          
		  
