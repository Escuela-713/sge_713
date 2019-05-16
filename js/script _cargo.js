		$(function() {
			load(1);
		});

		//Funcion que se ejecuta al iniciar el form. Lista los paises en el div loader
		function load(page){
			console.log("load ejecutandose");
			var query=$("#q").val();
			var parametros = {"action":"ajax"};
			$("#loader").fadeIn('slow');
			$.ajax({
				url:'ajax/listar_cargo.php',
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


		$('#editCargoModal').on('show.bs.modal', function (event) {
		  console.log("evento on");
		  var button = $(event.relatedTarget); // Button that triggered the modal
		  var name = button.data('name'); 
		  var descripcion= button.data('descripcion');
		  $('edit_descripcion').val(descripcion);
		  $('#edit_name').val(name);
		  var id = button.data('id');
		  $('#edit_id').val(id);
		})

		$("#edit_cargo" ).submit(function( event ) {
		  var parametros = $(this).serialize();
			$.ajax({
					type: "POST",
					url: "ajax/modificar_cargo.php",
					data: parametros,
					 beforeSend: function(objeto){
						$("#resultados").html("Enviando...");
					  },
					success: function(datos){
					$("#resultados").html(datos);
					load(1);
					$('#editCargoModal').modal('hide');
				  }
			});
		  event.preventDefault();
		});
		
		$("#add_cargo" ).submit(function( event ) {
		  var parametros = $(this).serialize();
			$.ajax({
					type: "POST",
					url: "ajax/nuevo_cargo.php",
					data: parametros,
					 beforeSend: function(objeto){
						$("#resultados").html("Enviando...");
					  },
					success: function(datos){
					$("#resultados").html(datos);
					load(1);
					$('#addCargoModal').modal('hide');
				  }
			});
		  event.preventDefault();
		});

		$('#deleteCargoModal').on('show.bs.modal', function (event) {
		  var button = $(event.relatedTarget) // Button that triggered the modal
		  var id = button.data('id') 
		  $('#delete_id').val(id)
		})
		
		$( "#delete_cargo" ).submit(function( event ) {
		  var parametros = $(this).serialize();
			$.ajax({
					type: "POST",
					url: "ajax/eliminar_cargo.php",
					data: parametros,
					 beforeSend: function(objeto){
						$("#resultados").html("Enviando...");
					  },
					success: function(datos){
					$("#resultados").html(datos);
					load(1);
					$('#deleteCargoModal').modal('hide');
				  }
			});
		  event.preventDefault();
		});
