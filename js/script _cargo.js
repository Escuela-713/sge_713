		$(function() {
			load(1);
		});

		//Funcion que se ejecuta al iniciar el form. Lista los paises en el div loader
		function load(page){
			var parametros = {"action":"ajax"};
			$("#loader").fadeIn('slow');
			$.ajax({
				url:'php/listar_cargos.php',
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

		$('#CargoModal').on('show.bs.modal', function (event) {
		  var button = $(event.relatedTarget); // Button that triggered the modal
		  var id = button.data('id');
		  if ( isNaN(id) )
		  {
				$('#titulo').text("Nuevo Cargo");
				$('#id').val('undefined');
				$('#nombre').val('');
				$('#descripcion').val('');
		  }
		  else
		  {
		  	  $('#titulo').text("Editar Cargo");
			  var name = button.data('name'); 
			  var descripcion= button.data('descripcion');
			  $('#descripcion').val(descripcion);
			  $('#nombre').val(name);
			  $('#id').val(id);
		  }
		});

		$("#frm_cargo" ).submit(function( event ) {
			
			var parametros = $(this).serialize();
				$.ajax({
				type: "POST",
				url: "php/abm_cargo.php",
				data: parametros,
				beforeSend: function(objeto){
					$("#resultados").html("Enviando...");
				},
				success: function(datos){
					$("#resultados").html(datos);
					load(1);
					$('#CargoModal').modal('hide');
				}
				});
			event.preventDefault();
		});

		$('#deleteModal').on('show.bs.modal', function (event) {
		  var button = $(event.relatedTarget);
		  var id = button.data('id');
		  $('#delete_id').val(id);
		  $('#titulo_eliminar').text("Eliminar Cargo");
		});
		
		$("#frm_delete").submit(function( event ) {
			var parametros = $(this).serialize();
			$.ajax({
				type: "POST",
				url: "php/abm_cargo.php",
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
