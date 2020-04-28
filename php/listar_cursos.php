<?php
include("cls_curso.php");
	
$action = (isset($_REQUEST['action'])&& $_REQUEST['action'] !=NULL)?$_REQUEST['action']:'';
if($action == 'ajax'){
	$obj=new curso();
	$query= $obj->obtener_cursos();
		
	?>
		<div class="table-responsive">
			<table class="table table-striped table-hover">
				<thead>
					<tr>
						<th class="d-none">Id Curso</th>
						<th>Año</th>
						<th>División</th>
						<th></th>
					</tr>
				</thead>
				<tbody>	
						<?php 
						
						while($row = mysqli_fetch_array($query)){	
							$id=$row['id_curso'];
							$anio=$row['anio'];
							$division=$row['division'];
						?>	
						<tr>
							<td class="d-none"><?php echo $id;?></td>
							<td ><?php echo $anio;?></td>
							<td><?php echo $division;?></td>
							<td class = "text-right">
								<a href="#CursoModal" class="btn btn-info" data-target="#CursoModal" class="edit" data-toggle="modal" data-id='<?php echo $id;?>' data-name="<?php echo $name?>" data-anio="<?php echo $anio?>" data-division="<?php echo $division?>"  ><span class="glyphicon glyphicon-edit" ></span>Editar</a>
								<a href="#deleteModal" class="btn btn-danger" class="delete" data-toggle="modal" data-id="<?php echo $id;?>"><span class="glyphicon glyphicon-trash"  ></span>Eliminar</a>
                    		</td>
						</tr>
						<?php }?>
				</tbody>			
			</table>
		</div>	

	<?php	
}
?>          
		  
