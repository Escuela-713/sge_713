		$(function() {
			load();
		});

		//Funcion que se ejecuta al iniciar el form. Lista los paises en el div loader
		function load(){
			
			var parametros = {"action":"ajax"};
			$("#loader").fadeIn('slow');
			$.ajax({
				url:'php/listar_carreras.php',
				data: parametros,
				beforeSend: function(objeto){
					$("#loader").html("Cargando...");
				},
				success:function(data){
					$(".outer_div").html(data).fadeIn('slow');
					$("#loader").html("");

				}
			})
		};

		$(document).ready(function (){
			$('#deleteCarreraModal').on('show.bs.modal', function (event) {
		  var button = $(event.relatedTarget) // Button that triggered the modal
		  var id = button.data('id') 
		  $('#delete_id').val(id)

		})

			$('#delete_carrera' ).submit(function( event ) {
				var parametros = $(this).serialize();
				$.ajax({
					type: "POST",
					url: "php/eliminar_carrera.php",
					data: parametros,
					beforeSend: function(objeto){
						$("#resultados").html("Enviando...");
					},
					success: function(datos){
						$("#resultados").html(datos);
						load(1);
						$('#deleteCarreraModal').modal('hide');
					}
				});
				event.preventDefault();
			});

			$('#add_carrera' ).submit(function( event ) {
				var parametros = $(this).serialize();
				$.ajax({
					type: "POST",
					url: "php/nuevo_carrera.php",
					data: parametros,
					beforeSend: function(objeto){
						$("#resultados").html("Enviando...");
					},
					success: function(datos){
						$("#resultados").html(datos);
						load(1);
						$('#addCarreraModal').modal('hide');
					}
				});
				event.preventDefault();
			});
		})

		$('#editCarreraModal').on('show.bs.modal', function (event) {
		  var button = $(event.relatedTarget); // Button that triggered the modal
		  var name = button.data('name'); 
		  var plan= button.data('plan');
		  var id = button.data('id');
		  var estado = button.data('estado');
		  $('#edit_plan').val(plan);
		  $('#edit_name').val(name);
		  $('#edit_id').val(id);
		  $('select[name="edit_estado"]').val(estado);
		})

		$("#edit_carrera" ).submit(function( event ) {
			var parametros = $(this).serialize();
			$.ajax({
				type: "POST",
				url: "php/modificar_carrera.php",
				data: parametros,
				beforeSend: function(objeto){
					$("#resultados").html("Enviando...");
				},
				success: function(datos){
					$("#resultados").html(datos);
					load(1);
					$('#editCarreraModal').modal('hide');
				}
			});
			event.preventDefault();
		});