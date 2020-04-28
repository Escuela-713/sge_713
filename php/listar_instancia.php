<?php
require_once "cls_instancia.php";
$action = (isset($_REQUEST['action'])&& $_REQUEST['action'] !=NULL)?$_REQUEST['action']:'';
if($action == 'ajax'){
	$obj=new instancia();
	$query   =$obj->obtener_instancia();
	?>
	<div class="table-responsive">
		<table class="table table-striped table-hover">
			<thead>
				<tr>
					<th class="d-none">Id instancia</th>
					<th>Nombre</th>
					<th></th>
				</tr>
			</thead>
			<tbody>	
				<?php 

				while($row = mysqli_fetch_array($query)){	
					$instancia_id=$row['id_instancia'];
					$instancia_name=$row['nombre'];


					?>	
					<tr>
						<td class="d-none"><?php echo $instancia_id;?></td>
						<td ><?php echo $instancia_name;?></td>
						<td class = "text-right">

							<a href="#CargoModal"  class="btn btn-info" data-target="#CargoModal" class="edit" data-toggle="modal" data-id='<?php echo $cargo_id;?>' data-name="<?php echo $cargo_name?>" data-descripcion="<?php echo $cargo_descripcion?>"> <span class="glyphicon glyphicon-edit" ></span>Editar</a>

							<a href="#deleteModal" class="btn btn-danger" class="delete" data-toggle="modal" data-id="<?php echo $cargo_id;?>"><span class="glyphicon glyphicon-trash"  ></span>Eliminar</a>
						</td>
					</tr>
				<?php }?>
			</tbody>			
		</table>
	</div>	

	<?php	
}