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

		$('#editProvinciaModal').on('show.bs.modal', function (event) {
		  var button = $(event.relatedTarget) // Button that triggered the modal
		  var name = button.data('name') 
		  $('#edit_name').val(name)
		  var id_provincia = button.data('id') 
		  $('#edit_id').val(id_provincia)
		  var id_pais = button.data('idpais') 

		  //cargo la lista paises
		  $.ajax({
		  	type: "POST",
		  	url:"php/select_options_listar_paises.php",
		  	success:function (data)
		  	{
		  		
		  		$("#id_pais_m").html(data);
		  		$('select[name="id_pais_m"]').val(id_pais);
		  	},

		  })

		})

		$('#addProvinciaModal').on('show.bs.modal', function (event) {
		 
		  //cargo la lista paises
		  $.ajax({
		  	type: "POST",
		  	url:"php/select_options_listar_paises.php",
		  	success:function (data)
		  	{
		  		$("#id_pais").html(data);
		  	},

		  })

		})
		
		$('#deleteProvinciaModal').on('show.bs.modal', function (event) {
		  var button = $(event.relatedTarget) // Button that triggered the modal
		  var id = button.data('id') 
		  $('#delete_id').val(id)
		})
		
		$("#edit_provincia" ).submit(function( event ) {
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
					$('#editProvinciaModal').modal('hide');
				}
			});
			event.preventDefault();
		});
		
		
		$( "#add_provincia" ).submit(function( event ) {
			var parametros = $(this).serialize();
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
					$('#addProvinciaModal').modal('hide');
				}
			});
			event.preventDefault();
		});
		
		$( "#delete_provincia" ).submit(function( event ) {
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
					$('#deleteProvinciaModal').modal('hide');
				}
			});
			event.preventDefault();
		});