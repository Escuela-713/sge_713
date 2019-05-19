<?php
include("conexion.php");

$action = (isset($_REQUEST['action'])&& $_REQUEST['action'] !=NULL)?$_REQUEST['action']:'';
if($action == 'ajax'){
	
	$query   = mysqli_query($con,"call obtener_provincias()");

	?>
	<div class="table-responsive">
		<table class="table table-striped table-hover">
			<thead>
				<tr>
					<th class="d-none">Id Provincia</th>
					<th>Nombre</th>
					<th>Pais</th>
					<th></th>
				</tr>
			</thead>
			<tbody>	
				<?php 

				while($row = mysqli_fetch_array($query)){	
					$provincia_id=$row['id_provincia'];
					$provincia_name=$row['nombre'];
					$provincia_pais=$row['pais'];

					?>	
					<tr>
						<td class="d-none"><?php echo $provincia_id;?></td>
						<td ><?php echo $provincia_name;?></td>
						<td ><?php echo $provincia_pais;?></td>
						<td class = "text-right">
							<a href="#editProvinciaModal"  class="btn btn-info" data-target="#editProvinciaModal" class="edit" data-toggle="modal" data-id='<?php echo $provincia_id;?>' data-name="<?php echo $provincia_name?>"><span class="glyphicon glyphicon-edit" >Editar</span> </a>
							<a href="#deleteProvinciaModal" class="btn btn-danger" class="delete" data-toggle="modal" data-id="<?php echo $provincia_id;?>"><span class="glyphicon glyphicon-trash"  >Eliminar</span></a>
						</td>
					</tr>
				<?php }?>
			</tbody>			
		</table>
	</div>	

	
	
	<?php	

}
?>          

