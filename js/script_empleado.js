		$(function() {
			load(1);
		});

		//Funcion que se ejecuta al iniciar el form. Lista los paises en el div loader
		function load(page){
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

		$('#editEmpleadoModal').on('show.bs.modal', function (event) {
		  var button = $(event.relatedTarget) // Button that triggered the modal
		  var name = button.data('name') ;
		  $('#edit_name').val(name);
		  var id = button.data('id') ;
		  $('#edit_id').val(id);
		})

		$('#addEmpleadoModal').on('show.bs.modal', function (event) {
		  //cargo lista paises
		  $.ajax({
		  	type: "POST",
		  	url:"php/select_options_listar_paises.php",
		  	success:function (data)
		  	{
		  		$("#id_pais").html(data);
		  	},

		  })
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

		  })
		})
		
		$('#deleteEmpleadoModal').on('show.bs.modal', function (event) {
		  console.log("on ejec");
		  var button = $(event.relatedTarget) ;// Button that triggered the modal
		  var id = button.data('id') ;
		  $('#delete_id').val(id);
		  
		})
		
		$("#edit_empleado" ).submit(function( event ) {
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
		
		
		$( "#add_empleado" ).submit(function( event ) {
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
		
		$( "#delete_empleado" ).submit(function( event ) {
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
					$('#deleteEmpleadoModal').modal('hide');
				  }
			});
		  event.preventDefault();
		});

		//Evento que se ejecuta cuando el usuario cambia la selección de la lista desplegable en el modal nuevo.
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
						$("#id_provincia").html(data);
					}

				})
			}
		})

		$('#id_provincia').on('change',function(){
			var id_provincia=this.value;
			console.log(id_provincia);
			if (id_provincia)
			{
				$.ajax({
					type: "POST",
					url:"php/select_options_listar_localidades_por_provincia.php",
					data:{id_provincia:id_provincia},
					success:function (data)
					{
						$("#id_localidad").html(data);
					}

				})
			}
		})
