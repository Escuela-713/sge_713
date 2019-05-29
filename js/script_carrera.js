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


	$('#deleteModal').on('show.bs.modal', function (event) {
		  var button = $(event.relatedTarget); // Button that triggered the modal
		  var id = button.data('id');
		  $('#delete_id').val(id);
		  $('#titulo_eliminar').text("Eliminar Carrera");
		});

			$('#frm_delete' ).submit(function( event ) {
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
						$('#deleteModal').modal('hide');
					}
				});
				event.preventDefault();
			});

	$('#CarreraModal').on('show.bs.modal', function (event) {
		var button = $(event.relatedTarget); // Button that triggered the modal
		var id = button.data('id');

		if (isNaN(id))
		{	
			$('#titulo').text("Nueva Carrera");
			$('#id').val('undefined');
			$('#name').val('');
			$('#plan').val('');
		}
		else
		{ var estado = button.data('estado');  
				var name = button.data('name'); 
				var plan= button.data('plan');
				$('#titulo').text("Editar Carrera");	
				$('#plan').val(plan);
				$('#name').val(name);
				$('#id').val(id);
				$('select[name="estado"]').val(estado);
		}
	});


			$('#frm_carrera' ).submit(function( event ) {
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
							$('#CarreraModal').modal('hide');
						}
					});
				event.preventDefault();
			});
