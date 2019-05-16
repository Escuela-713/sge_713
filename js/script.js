		$(function() {
			load(1);
		});

		//Funcion que se ejecuta al iniciar el form. Lista los paises en el div loader
		function load(page){
			var query=$("#q").val();
			var parametros = {"action":"ajax"};
			$("#loader").fadeIn('slow');
			$.ajax({
				url:'ajax/listar_paises.php',
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
		
		$('#editPaisModal').on('show.bs.modal', function (event) {
		  var button = $(event.relatedTarget) // Button that triggered the modal
		  var name = button.data('name') 
		  $('#edit_name').val(name)
		  var id = button.data('id') 
		  $('#edit_id').val(id)
		})
		
		$('#deletePaisModal').on('show.bs.modal', function (event) {
		  var button = $(event.relatedTarget) // Button that triggered the modal
		  var id = button.data('id') 
		  $('#delete_id').val(id)
		})
		
		$("#edit_pais" ).submit(function( event ) {
		  var parametros = $(this).serialize();
			$.ajax({
					type: "POST",
					url: "ajax/modificar_pais.php",
					data: parametros,
					 beforeSend: function(objeto){
						$("#resultados").html("Enviando...");
					  },
					success: function(datos){
					$("#resultados").html(datos);
					load(1);
					$('#editPaisModal').modal('hide');
				  }
			});
		  event.preventDefault();
		});
		
		
		$( "#add_pais" ).submit(function( event ) {
		  var parametros = $(this).serialize();
			$.ajax({
					type: "POST",
					url: "ajax/nuevo_pais.php",
					data: parametros,
					 beforeSend: function(objeto){
						$("#resultados").html("Enviando...");
					  },
					success: function(datos){
					$("#resultados").html(datos);
					load(1);
					$('#addPaisModal').modal('hide');
				  }
			});
		  event.preventDefault();
		});
		
		$( "#delete_pais" ).submit(function( event ) {
		  var parametros = $(this).serialize();
			$.ajax({
					type: "POST",
					url: "ajax/eliminar_pais.php",
					data: parametros,
					 beforeSend: function(objeto){
						$("#resultados").html("Enviando...");
					  },
					success: function(datos){
					$("#resultados").html(datos);
					load(1);
					$('#deletePaisModal').modal('hide');
				  }
			});
		  event.preventDefault();
		});