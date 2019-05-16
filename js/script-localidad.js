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
		
