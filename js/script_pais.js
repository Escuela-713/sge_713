		$(function() {
			load(1);
		});

		//Funcion que se ejecuta al iniciar el form. Lista los paises en el div loader
		function load(page){
			var parametros = {"action":"ajax"};
			$("#loader").fadeIn('slow');
			$.ajax({
				url:'php/listar_paises.php',
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
		
		$('#PaisModal').on('show.bs.modal', function (event) {
		  var button = $(event.relatedTarget) ;// Button that triggered the modal
		  var id = button.data('id');
		  if (isNaN(id))
		  { 
		  	//nuevo registro
		  	$('#titulo').text("Nuevo Pais");
		  	$('#id').val('undefined');
		  	$('#name').val('');
		  
		  }
		  else
		  {
		  	//modificar registro
		  	$('#titulo').text("Editar Pais");
		  	$('#id').val(id);
		  	var name = button.data('name') ;
		  	$('#name').val(name);
		  }
		})

		
		$("#frm_pais" ).submit(function( event ) {
		  var id=$('input[name="id"]').val();
		  var parametros = $(this).serialize();
		  if (isNaN(id))
		  {  
		  	$.ajax({
				type: "POST",
				url: "php/nuevo_pais.php",
				data: parametros,
				beforeSend: function(objeto){
					$("#resultados").html("Enviando...");
				},
				success: function(datos){
					$("#resultados").html(datos);
					load(1);
					$('#PaisModal').modal('hide');
				}
			});
		}
		else
		{
			//modifico el registro pais
			$.ajax({
				type: "POST",
				url: "php/modificar_pais.php",
				data: parametros,
				beforeSend: function(objeto){
					$("#resultados").html("Enviando...");
				},
				success: function(datos){
					$("#resultados").html(datos);
					load(1);
					$('#PaisModal').modal('hide');
				}
			});	
		}
		event.preventDefault();
		});
		
		$('#deleteModal').on('show.bs.modal', function (event) {
		  var button = $(event.relatedTarget); // Button that triggered the modal
		  var id = button.data('id');
		  $('#delete_id').val(id);
		  $('#titulo_eliminar').text("Eliminar Pais");
		})
		
		$("#frm_delete").submit(function( event ) {
			var parametros = $(this).serialize();
			$.ajax({
				type: "POST",
				url: "php/eliminar_pais.php",
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