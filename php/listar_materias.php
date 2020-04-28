<?php
include("conexion.php");
require_once "cls_materia.php";
	
$action = (isset($_REQUEST['action'])&& $_REQUEST['action'] !=NULL)?$_REQUEST['action']:'';
if($action == 'ajax'){
	
	$obj=new materia();
	$query   = $obj->obtener_materias();
		
	?>
		<div class="table-responsive">
			<table class="table table-striped table-hover">
				<thead>
					<tr>
						<th class="d-none">Id Materia</th>
						<th>Nombre</th>
						<th>Descripción</th>
						<th></th>
					</tr>
				</thead>
				<tbody>	
						<?php 
						
						while($row = mysqli_fetch_array($query)){	
							$id_materia=$row['id_materia'];
							$nombre=$row['nombre'];
							$descripcion=$row['descripción'];
						?>	
						<tr>
							<td  class="d-none"><?php echo $id_materia;?></td>
							<td ><?php echo $nombre;?></td>
							<td ><?php echo $descripcion;?></td>
							<td class = "text-right">
								<a href="#MateriaModal"  class="btn btn-info" data-target="#MateriaModal" class="edit" data-toggle="modal" data-id='<?php echo $id_materia;?>'>Editar</ </a>
								<a href="#deleteModal" class="btn btn-danger" class="delete" data-toggle="modal" data-id="<?php echo $id_materia;?>">Eliminar</a>
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
		  
