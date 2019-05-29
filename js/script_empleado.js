$(function() {
	load(1);
});

//Funcion que se ejecuta al iniciar o refescar el form. 
function load(page)
{
	var parametros = {"action":"ajax"};
	$("#loader").fadeIn('slow');
	$.ajax({
		url:'php/listar_empleados.php',
		data: parametros,
		beforeSend: function(objeto){
			$("#loader").html("Cargando...");
		},
		success:function(data){
			$(".outer_div").html(data).fadeIn('slow');
			$("#loader").html("");
		}
	})
}

$('#EmpleadoModal').on('show.bs.modal', function (event) 
{
	var button = $(event.relatedTarget); 
	var id = button.data('id');
	var id_provincia=button.data('idprovincia');
	var id_provincia_d=button.data('idprovinciad');	
	var id_pais=button.data('idpais');
	var id_pais_d=button.data('idpaisd');
	var id_cargo=button.data('idcargo');
	var id_estado_civil=button.data('idestadocivil');

	//cargo lista paises
	$.ajax({
	  	type: "POST",
	  	url:"php/select_options_listar_paises.php",
	  	success:function (data)
	  	{
	  		$("#id_pais").html(data);
	  		$("#id_pais_d").html(data);

	  		if (!isNaN(id_pais))
			{
				$('select[name="id_pais"]').val(id_pais);
			}
			else
			{
				$('select[name="id_pais"]').change();
			}
			
			if (!isNaN(id_pais_d))
			{
				$('select[name="id_pais_d"]').val(id_pais);
			}
			else
			{
				$('select[name="id_pais_d"]').change();
			}
	  	},
	});

	if (!isNaN(id_provincia) || !isNaN(id_provincia_d) )
	{
		//cargo lista provincias
		$.ajax({
		  	type: "POST",
		  	url:"php/select_options_listar_provincias_por_pais.php",
		  	success:function (data)
		  	{
		  		$("#id_provincia").html(data);
		  		$("#id_provincia_d").html(data);

		  		if (!isNaN(id_provincia))
				{
					$('select[name="id_provincia"]').val(id_provincia);
				}
				else
				{
					$('select[name="id_provincia"]').change();
				}
				
				if (!isNaN(id_provincia_d))
				{
					$('select[name="id_provincia_d"]').val(id_provincia_d);
				}
				else
				{
					$('select[name="id_provincia_d"]').change();
				}
		  	},
		});
	}

	//cargo lista cargos
	$.ajax({
		type: "POST",
		url:"php/select_options_listar_cargos.php",
		success:function (data)
		{
			$("#id_cargo").html(data);
			if (!isNaN(id_cargo))
			{
				$('select[name="id_cargo"]').val(id_cargo);
			}	
		},
	})

	//cargo lista estado civil
	$.ajax({
	  	type: "POST",
		url:"php/select_options_listar_estados_civil.php",
		success:function (data)
		{
			$("#id_estado_civil").html(data);
			if (!isNaN(id_estado_civil))
			{
				$('select[name="id_estado_civil"]').val(id_estado_civil);
			}	
		},
	})
});
		
$('#deleteModal').on('show.bs.modal', function (event) {
	var button = $(event.relatedTarget);
	var id = button.data('id') ;
	$('#delete_id').val(id);	  
})
		
$("#frm_empleado" ).submit(function( event ) {
	var parametros = $(this).serialize();
	$.ajax({
		type: "POST",
		url: "php/modificar_empleado.php",
		data: parametros,
		beforeSend: function(objeto){
			$("#resultados").html("Enviando...");
		},
		success: function(datos){
			$("#resultados").html(datos);
			load(1);
			$('#editEmpleadoModal').modal('hide');
		}
	});
	event.preventDefault();
});
			
$( "#frm_empleado" ).submit(function( event ) {
  	var parametros = $(this).serialize();
	$.ajax({
		type: "POST",
		url: "php/nuevo_empleado.php",
		data: parametros,
		beforeSend: function(objeto){
			$("#resultados").html("Enviando...");
		},
		success: function(datos){
			$("#resultados").html(datos);
			load(1);
			$('#addEmpleadoModal').modal('hide');
		}
	});
	event.preventDefault();
});
		
$( "#frm_delete" ).submit(function( event ) {
 	var parametros = $(this).serialize();
	$.ajax({
		type: "POST",
		url: "php/eliminar_empleado.php",
		data: parametros,
		beforeSend: function(objeto){
			$("#resultados").html("Enviando...");
		},
		success: function(datos){
			$("#resultados").html(datos);
			load(1);
			$('#deleteModal').modal('hide');
		}
	});
	event.preventDefault();
});

//Evento que se ejecuta cuando el usuario cambia la selección de la lista 
//desplegable en el modal nuevo.
$('#id_pais').on('change',function(){
	var id_pais=this.value;
	if (id_pais)
	{
		$.ajax({
			type: "POST",
			url:"php/select_options_listar_provincias_por_pais.php",
			data:{id_pais:id_pais},
			success:function (data)
			{
				$('#id_provincia').html(data);
				$('#id_provincia').change();
			}
			})
	}
});

$('#id_pais_d').on('change',function(){
	var id_pais=this.value;
	if (!isNaN(id_pais))
	{
		$.ajax({
			type: "POST",
			url:"php/select_options_listar_provincias_por_pais.php",
			data:{id_pais:id_pais},
			success:function (data)
			{
				$("#id_provincia_d").html(data);
				$('#id_provincia_d').change();
			}
			})
	}
});

$('#id_provincia').on('change',function(){
	var id_provincia=this.value;
	if (!isNaN(id_provincia))
	 	{
			$.ajax({
				type: "POST",
				url:"php/select_options_listar_localidades_por_provincias.php",
				data:{id_provincia:id_provincia},
				success:function (data)
				{
					$("#id_localidad").html(data);
				}
			})
		}
});

$('#id_provincia_d').on('change',function(){
	var id_provincia=this.value;
	if (!isNaN(id_provincia))
	{
		$.ajax({
			type: "POST",
			url:"php/select_options_listar_localidades_por_provincias.php",
			data:{id_provincia:id_provincia},
			success:function (data)
			{
				$("#id_localidad_d").html(data);
			}
		})
	}
})
