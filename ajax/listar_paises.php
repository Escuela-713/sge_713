<?php
include("conexion.php");
	
$action = (isset($_REQUEST['action'])&& $_REQUEST['action'] !=NULL)?$_REQUEST['action']:'';
if($action == 'ajax'){
	
	
	$query   = mysqli_query($con,"call obtener_paises()");
		
	?>
		<div class="table-responsive">
			<table class="table table-striped table-hover">
				<thead>
					<tr>
						<th class="d-none">Id Pais</th>
						<th>Nombre</th>
						<th></th>
					</tr>
				</thead>
				<tbody>	
						<?php 
						while($row = mysqli_fetch_array($query)){	
							$pais_id=$row['id_pais'];
							$pais_name=$row['nombre'];
						?>	
						<tr>
							<td class="d-none"><?php echo $pais_id;?></td>
							<td ><?php echo $pais_name;?></td>
							<td class = "text-right">
								<a href="#"  class="btn btn-info" data-target="#editPaisModal" class="edit" data-toggle="modal" data-id='<?php echo $pais_id;?>' data-name="<?php echo $pais_name?>"><span class="glyphicon glyphicon-edit" ></span>Editar</a>
								<a href="#deletePaisModal" class="btn btn-danger" class="delete" data-toggle="modal" data-id="<?php echo $pais_id;?>"><span class="glyphicon glyphicon-trash"  ></span>Eliminar</a>
                    		</td>
						</tr>
						<?php }?>
				</tbody>			
			</table>
		</div>	

	
	
	<?php	
		
}
?>          
		  
