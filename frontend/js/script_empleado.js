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
	
	//cargo lista paises
	$.ajax({
	  	type: "POST",
	  	url:"php/select_options_listar_paises.php",
	  	success:function (data)
	  	{
	  		$("#id_pais").html(data);
	  		$("#id_pais_d").html(data);

	  		if (isNaN(id))
			{
				$('#id_pais').change();
				$('#id_pais_d').change();
			}
			
	  	},
	});

	//cargo lista cargos
	$.ajax({
		type: "POST",
		url:"php/select_options_listar_cargos.php",
		success:function (data)
		{
			$("#id_cargo").html(data);
		},
	})

	//cargo lista estado civil
	$.ajax({
	  	type: "POST",
		url:"php/select_options_listar_estados_civil.php",
		success:function (data)
		{
			$("#id_estado_civil").html(data);	
		},
	});

	if (isNaN(id))
	{
		//Nuevo Empleado
		$('#titulo').text("Nuevo Empleado");
		$('#id').val('undefined');
		$('#nombre').val('');
		$('#apellido').val('');
		$('#legajo').val('');
		$('#fecha_de_ingreso').val('');
		$('#telefono').val('');
		$('#dni').val('');
		$('#fecha_de_nacimiento').val('');
		$('#barrio').val('');
		$('#calle').val('');
		$('#numero').val('');
		
		$('#id_cargo option:not(:selected)').attr('disabled',false);
		
	}
	else
	{
	 	//Modificar empleado
	 	$('#titulo').text("Editar Empleado");	
	  	$('#id').val(id);
	  	var id_pais_d;
	  	var id_provincia_d;
	  	var id_localidad_d;
	  	var id_pais;
	  	var id_provincia;
	  	var id_localidad;

	 	var parametros = {"id":id};
	    $.when($.ajax({
	  		type: "POST",
	  		data:parametros,

			url:"php/json_obtener_empleado.php",
		
			success:function (data)
			{  	
				console.log(data);
				var empleado=JSON.parse(data);
				$('#nombre').val(empleado.nombre);
				$('#apellido').val(empleado.apellido);
				$('#legajo').val(empleado.legajo);
				$('#fecha_de_ingreso').val(empleado.fecha_ingreso);
				$('#telefono').val(empleado.telefono);
				$('#dni').val(empleado.dni);
				$('#fecha_de_nacimiento').val(empleado.fecha_nacimiento);
				$('#barrio').val(empleado.barrio);
				$('#calle').val(empleado.calle);
				$('#numero').val(empleado.numero);
				$('#id_estado_civil').val(empleado.id_estado_civil);
				$('#id_cargo').val(empleado.id_cargo);
				$('#id_cargo option:not(:selected)').attr('disabled',true);
				$('#id_pais_d').val(empleado.id_pais);

				id_pais_d=empleado.id_pais;
				id_provincia_d=empleado.id_provincia;
				id_localidad_d=empleado.id_localidad;
				id_pais=empleado.id_pais_nac;
				id_provincia=empleado.id_provincia_nac;
				id_localidad=empleado.id_localidad_nac;
			},
		})).done(function(){
			
			$.ajax({
				type: "POST",
				url:"php/select_options_listar_provincias_por_pais.php",
				data:{id_pais:id_pais_d},
				success:function (data)
				{
					$("#id_provincia_d").html(data);
					$('#id_provincia_d').val(id_provincia_d);
				},
			})
			$.ajax({
				type: "POST",
				url:"php/select_options_listar_localidades_por_provincias.php",
				data:{id_provincia:id_provincia_d},
				success:function (data)
				{
					$("#id_localidad_d").html(data);
					$('#id_localidad_d').val(id_localidad_d);
				},
			})

			$.ajax({
				type: "POST",
				url:"php/select_options_listar_provincias_por_pais.php",
				data:{id_pais:id_pais},
				success:function (data)
				{
					$("#id_provincia").html(data);
					$('#id_provincia').val(id_provincia);
				},
			})
			$.ajax({
				type: "POST",
				url:"php/select_options_listar_localidades_por_provincias.php",
				data:{id_provincia:id_provincia},
				success:function (data)
				{
					$("#id_localidad").html(data);
					$('#id_localidad').val(id_localidad);
				},
			})

		});  	
}

});
		
$('#deleteModal').on('show.bs.modal', function (event) {
	var button = $(event.relatedTarget);
	var id = button.data('id') ;
	$('#delete_id').val(id);
	$('#titulo_eliminar').text("Eliminar Empleado");	  
})
			
$( "#frm_empleado" ).submit(function( event ) {
  	var parametros = $(this).serialize();
	$.ajax({
		type: "POST",
		url: "php/abm_empleado.php",
		data: parametros,
		beforeSend: function(objeto){
			$("#resultados").html("Enviando...");
		},
		success: function(datos){
			$("#resultados").html(datos);
			load(1);
			$('#EmpleadoModal').modal('hide');
		}
	});
	event.preventDefault();
});
		
$( "#frm_delete" ).submit(function( event ) {
 	var parametros = $(this).serialize();
	$.ajax({
		type: "POST",
		url: "php/abm_empleado.php",
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
