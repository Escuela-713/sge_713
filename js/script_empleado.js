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
