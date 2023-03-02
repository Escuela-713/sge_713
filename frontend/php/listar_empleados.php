<?php
include("conexion.php");
require_once "cls_empleado.php";
	
$action = (isset($_REQUEST['action'])&& $_REQUEST['action'] !=NULL)?$_REQUEST['action']:'';
if($action == 'ajax'){
	
	$obj=new empleado();
	$query   = $obj->obtener_empleados();
		
	?>
		<div class="table-responsive">
			<table class="table table-striped table-hover">
				<thead>
					<tr>
						<th class="d-none">Id Empleado</th>
						<th>Legajo</th>
						<th>Cargo</th>
						<th>Apellido, Nombre</th>
						<th>DNI</th>
						<th>Telefono</th>
						<th></th>
					</tr>
				</thead>
				<tbody>	
						<?php 
						
						while($row = mysqli_fetch_array($query)){	
							$id_empleado=$row['id_empleado'];
							$legajo=$row['legajo'];
							$cargo=$row['cargo'];
							$ape_nom=$row['apellido'].", ".$row['nombre'];
							$dni=$row['dni'];
							$telefono=$row['telefono'];
						?>	
						<tr>
							<td  class="d-none"><?php echo $id_empleado;?></td>
							<td ><?php echo $legajo;?></td>
							<td ><?php echo $cargo;?></td>
							<td ><?php echo $ape_nom;?></td>
							<td ><?php echo $dni;?></td>
							<td ><?php echo $telefono;?></td>
							<td class = "text-right">
								<a href="#EmpleadoModal"  class="btn btn-info" data-target="#EmpleadoModal" class="edit" data-toggle="modal" data-id='<?php echo $id_empleado;?>'>Editar</ </a>
								<a href="#deleteModal" class="btn btn-danger" class="delete" data-toggle="modal" data-id="<?php echo $id_empleado;?>">Eliminar</a>
                    		</td>
						</tr>
						<?php }
						
						?>
				</tbody>			
			</table>
		</div>	

	
	
	<?php	
		
}

?>          
		  
