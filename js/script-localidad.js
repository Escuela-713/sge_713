$(function() {
	load(1);
});

		//Funcion que se ejecuta al iniciar el form. Lista los paises en el div loader
		function load(page){
			var query=$("#q").val();
			var parametros = {"action":"ajax"};
			$("#loader").fadeIn('slow');
			$.ajax({
				url:'ajax/listar_localidades.php',
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

		$( "#add_localidad" ).submit(function( event ) {
			var parametros = $(this).serialize();
			$.ajax({
				type: "POST",
				url: "ajax/nuevo_localidad.php",
				data: parametros,
				beforeSend: function(objeto){
					$("#resultados").html("Enviando...");
				},
				success: function(datos){
					$("#resultados").html(datos);
					load(1);
					$('#addLocalidadModal').modal('hide');
				}
			});
			event.preventDefault();
		});

		$('#deleteLocalidadModal').on('show.bs.modal', function (event) {
		  var button = $(event.relatedTarget) // Button that triggered the modal
		  var id = button.data('id') 
		  $('#delete_id').val(id)
		})
		
		$( "#delete_localidad" ).submit(function( event ) {
			var parametros = $(this).serialize();
			$.ajax({
				type: "POST",
				url: "ajax/eliminar_localidad.php",
				data: parametros,
				beforeSend: function(objeto){
					$("#resultados").html("Enviando...");
				},
				success: function(datos){
					$("#resultados").html(datos);
					load(1);
					$('#deleteLocalidadModal').modal('hide');
				}
			});
			event.preventDefault();
		});


		$('#editLocalidadModal').on('show.bs.modal', function (event) {
		  var button = $(event.relatedTarget); // Button that triggered the modal
		  var name = button.data('name') ;
		  $('#edit_name').val(name);
		  var id = button.data('id'); 
		  $('#edit_id').val(id);
		  var cp=button.data('cp');
		  $('#edit_cp').val(cp);
		  var id_provincia=button.data('idprovincia');
		  $('#edit_id_provincia').val(id_provincia);
		})

		$("#edit_localidad" ).submit(function( event ) {
			var parametros = $(this).serialize();
			$.ajax({
				type: "POST",
				url: "ajax/modificar_localidad.php",
				data: parametros,
				beforeSend: function(objeto){
					$("#resultados").html("Enviando...");
				},
				success: function(datos){
					$("#resultados").html(datos);
					load(1);
					$('#editLocalidadModal').modal('hide');
				}
			});
			event.preventDefault();
		});
		
