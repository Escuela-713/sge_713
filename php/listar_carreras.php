<?php
include("db_carrera.php");
	
$action = (isset($_REQUEST['action'])&& $_REQUEST['action'] !=NULL)?$_REQUEST['action']:'';
if($action == 'ajax'){
	
	$obj=new carrera();
	$query= $obj->obtener_carreras();
		
	?>
		<div class="table-responsive">
			<table class="table table-striped table-hover">
				<thead>
					<tr>
						<th class="d-none">Id Carrera</th>
						<th>Nombre</th>
						<th>Estado</th>
						<th class="d-none"></th>
						<th>Plan</th>
						<th></th>
					</tr>
				</thead>
				<tbody>	
						<?php 
						
						while($row = mysqli_fetch_array($query)){	
							$id=$row['id_carrera'];
							$name=$row['nombre'];
							$estado=(int)$row['estado'];
							$estados_desc="";
							if ($estado==0)
							{
								$estados_desc="Activo";
							}
							else
							{
								$estados_desc="Inactivo";
							}	
							$plan=$row['plan'];
							
						?>	
						<tr>
							<td class="d-none"><?php echo $id;?></td>
							<td ><?php echo $name;?></td>
							<td  class="d-none"><?php echo $estado;?></td>
							<td><?php echo $estados_desc;?></td>
							<td ><?php echo $plan;?></td>
							<td class = "text-right">
								<a href="#editCarreraModal"  class="btn btn-info" data-target="#editCarreraModal" class="edit" data-toggle="modal" data-id='<?php echo $id;?>' data-name="<?php echo $name?>" data-estado="<?php echo $estado?>" data-plan="<?php echo $plan?>"  ><span class="glyphicon glyphicon-edit" ></span>Editar</a>
								<a href="#deleteCarreraModal" class="btn btn-danger" class="delete" data-toggle="modal" data-id="<?php echo $id;?>"><span class="glyphicon glyphicon-trash"  ></span>Eliminar</a>
                    		</td>
						</tr>
						<?php }?>
				</tbody>			
			</table>
		</div>	

	<?php	
}
?>          
		  
