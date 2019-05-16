		$(function() {
			load();
		});

		//Funcion que se ejecuta al iniciar el form. Lista los paises en el div loader
		function load(){
			
			var query=$("#q").val();
			var parametros = {"action":"ajax"};
			$("#loader").fadeIn('slow');
			$.ajax({
				url:'ajax/listar_orientaciones.php',
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

		$('#deleteOrientacionModal').on('show.bs.modal', function (event) {
		  var button = $(event.relatedTarget) // Button that triggered the modal
		  var id = button.data('id') 
		  $('#delete_id').val(id)

		})

		$('#delete_orientacion' ).submit(function( event ) {
		  var parametros = $(this).serialize();
			$.ajax({
					type: "POST",
					url: "ajax/eliminar_orientacion.php",
					data: parametros,
					 beforeSend: function(objeto){
						$("#resultados").html("Enviando...");
					  },
					success: function(datos){
					$("#resultados").html(datos);
					load(1);
					$('#deleteOrientacionModal').modal('hide');
				  }
			});
		  event.preventDefault();
		});

		$('#add_orientacion' ).submit(function( event ) {
		  var parametros = $(this).serialize();
		  console.log("orientacion enviadoa");
			$.ajax({
					type: "POST",
					url: "ajax/nuevo_orientacion.php",
					data: parametros,
					 beforeSend: function(objeto){
						$("#resultados").html("Enviando...");
					  },
					success: function(datos){
					$("#resultados").html(datos);
					load(1);
					$('#addOrientacionModal').modal('hide');
				  }
			});
		  event.preventDefault();
		});
})