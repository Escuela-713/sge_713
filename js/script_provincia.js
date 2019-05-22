		$(function() {
			load(1);

		});

		//Funcion que se ejecuta al iniciar el form. Lista los paises en el div loader
		function load(page){
			var parametros = {"action":"ajax"};
			$("#loader").fadeIn('slow');
			$.ajax({
				url:'php/listar_provincias.php',
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

		$('#ProvinciaModal').on('show.bs.modal', function (event) {
		  var button = $(event.relatedTarget); // Button that triggered the modal
		  var id = button.data('id') 

		  //cargo la lista paises
		  $.ajax({
		  	type: "POST",
		  	url:"php/select_options_listar_paises.php",
		  	success:function (data)
		  	{
		  		$("#id_pais").html(data);
		  		if (!isNaN(id))
		  		{
		  			$('select[name="id_pais"]').val(id_pais);
		  		}
		  	},
		  })

		  if (isNaN(id))
		  {
		  	$('#titulo').text("Nueva Provincia");
		  	$('#id').val('undefined');
		  	$('#name').val('');
		  }
		  else
		  {
		  	  //Modificar registro
		  	  $('#titulo').text("Editar Provincia");	
		  	  $('#id').val(id);
		  	  var name = button.data('name');
		  	  $('#name').val(name);
		  	  var id_pais = button.data('idpais');
		  	}
		  });

		$('#deleteModal').on('show.bs.modal', function (event) {
		  var button = $(event.relatedTarget); // Button that triggered the modal
		  var id = button.data('id');
		  $('#delete_id').val(id);
		  $('#titulo_eliminar').text("Eliminar Provincia");
		});

		$( "#frm_provincia" ).submit(function( event ) {
			var id=$('input[name="id"]').val();
			var parametros = $(this).serialize();
			if (isNaN(id))
			{  
				$.ajax({
					type: "POST",
					url: "php/nuevo_provincia.php",
					data: parametros,
					beforeSend: function(objeto){
						$("#resultados").html("Enviando...");
					},
					success: function(datos){
						$("#resultados").html(datos);
						load(1);
						$('#ProvinciaModal').modal('hide');
					}
				});
			}
			else
			{
				var parametros = $(this).serialize();
				$.ajax({
					type: "POST",
					url: "php/modificar_provincia.php",
					data: parametros,
					beforeSend: function(objeto){
						$("#resultados").html("Enviando...");
					},
					success: function(datos){
						$("#resultados").html(datos);
						load(1);
						$('#ProvinciaModal').modal('hide');
					}
				});
			}

			event.preventDefault();
		});
		
		$( "#frm_delete" ).submit(function( event ) {
			var parametros = $(this).serialize();
			$.ajax({
				type: "POST",
				url: "php/eliminar_provincia.php",
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