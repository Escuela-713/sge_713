<?php
require_once "db_localidad.php";

$action = (isset($_REQUEST['action'])&& $_REQUEST['action'] !=NULL)?$_REQUEST['action']:'';
if($action == 'ajax'){
	
	$obj=new localidad();
	$query   = $obj->obtener_localidades();

	?>
	<div class="table-responsive">
		<table class="table table-striped table-hover">
			<thead>
				<tr>
					<th class="d-none">Id Localidad</th>
					<th>Nombre</th>
					<th>Código Postal</th>
					<th class="d-none">Id Provincia</th>
					<th>Provincia</th>
					<th class="d-none">Id Pais</th>
					<th>Pais</th>
					<th></th>
				</tr>
			</thead>
			<tbody>	
				<?php 
				while($row = mysqli_fetch_array($query)){	
					$localidad_id=$row['id_localidad'];
					$localidad_name=$row['nombre'];
					$localidad_codigo_postal=$row['codigo_postal'];
					$localidad_id_provincia=$row['id_provincia'];
					$localidad_nombre_provincia=$row['provincia'];
					$localidad_id_pais=$row['id_pais'];
					$localidad_nombre_pais=$row['pais'];
					?>	
					<tr>
						<td class="d-none"><?php echo $localidad_id;?></td>
						<td ><?php echo $localidad_name;?></td>
						<td><?php echo $localidad_codigo_postal;?></td>
						<td class="d-none"><?php echo $localidad_id_provincia;?></td>
						<td><?php echo $localidad_nombre_provincia;?></td>
						<td class="d-none"><?php echo $localidad_id_pais;?></td>
						<td><?php echo $localidad_nombre_pais;?></td>
						<td class = "text-right">
							<a href="#editLocalidadModal"  class="btn btn-info" data-target="#editLocalidadModal" class="edit" data-toggle="modal" data-id='<?php echo $localidad_id;?>' data-name="<?php echo $localidad_name?>" data-cp='<?php echo $localidad_codigo_postal;?>'  data-idprovincia='<?php echo $localidad_id_provincia;?>' data-nombreprovincia='<?php echo $localidad_nombre_provincia;?>' data-idpais='<?php echo $localidad_id_pais;?>' data-nombrepais='<?php echo $localidad_nombre_pais;?>' >
								<span class="glyphicon glyphicon-edit" >Editar</span> </a>
							<a href="#deleteLocalidadModal" class="btn btn-danger" class="delete" data-toggle="modal" data-id="<?php echo $localidad_id;?>"><span class="glyphicon glyphicon-trash"  >Eliminar</span></a>
						</td>
					</tr>
				<?php }?>
			</tbody>			
		</table>
	</div>	

	
	
	<?php	

}
?>          

