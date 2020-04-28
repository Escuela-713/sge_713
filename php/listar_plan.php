<?php
require_once "cls_plan.php";
$action = (isset($_REQUEST['action'])&& $_REQUEST['action'] !=NULL)?$_REQUEST['action']:'';
if($action == 'ajax'){
	$obj=new plan();
	$query   =$obj->obtener_planes();
	?>
	<div class="table-responsive">
		<table class="table table-striped table-hover">
			<thead>
				<tr>
					<th class="d-none">Id Plan</th>
					<th>Nombre</th>
					<th>Carrera</th>
					<th>Estado</th>
					<th></th>
				</tr>
			</thead>
			<tbody>	
				<?php 

				while($row = mysqli_fetch_array($query)){	
					$plan_id=$row['id_plan'];
					$plan_name=$row['plan'];
					$plan_carrera=$row['carrera'];
					$plan_estado=$row['estado']; 
					$plan_hscatedra=$row['horas_catedra'];
					$plan_hsreloj=$row['horas_reloj'];


					?>	
					<tr>
						<td class="d-none"><?php echo $plan_id;?></td>
						<td ><?php echo $plan_name;?></td>
						<td ><?php echo $plan_carrera;?></td>
						<td ><?php echo $plan_estado;?></td>
						<td class = "text-right">

							<a href="#PlanesModal"  class="btn btn-info" data-target="#PlanesModal" class="edit" data-toggle="modal" data-id='<?php echo $plan_id;?>' data-name="<?php echo $plan_name?>" data-estado="<?php echo $plan_estado?>" data-carreras="<?php echo $plan_carrera?>"  data-hscatedra= "<?php echo $plan_hscatedra?>" data-hsreloj="<?php echo $plan_hsreloj?>" > <span class="glyphicon glyphicon-edit" ></span>Editar</a>

							<a href="#deleteModal" class="btn btn-danger" class="delete" data-toggle="modal" data-id="<?php echo $plan_id?>"><span class="glyphicon glyphicon-trash"  ></span>Eliminar</a>
						</td>
					</tr>
				<?php }?>
			</tbody>			
		</table>
	</div>	

	<?php	
}