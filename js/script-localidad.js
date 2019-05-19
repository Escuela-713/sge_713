$(function() {
	load(1);
});

		//Funcion que se ejecuta al iniciar el form. Lista los paises en el div loader
		function load(page){
			var query=$("#q").val();
			var parametros = {"action":"ajax"};
			$("#loader").fadeIn('slow');
			$.ajax({
				url:'php/listar_localidades.php',
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

		$('#id_pais').on('change',function(){
			var id_pais=this.value;

			if (id_pais)
			{
				$.ajax({
					type: "POST",
					url:"php/select_options_listar_provincias_por_pais.php",
					data:{id_pais:id_pais},
					success:function (data)
					{
						$("#id_provincia").html(data);
					}

				})
			}
		})


		$('#id_pais_m').on('change',function(){
			var id_pais=this.value;

			if (id_pais)
			{
				$.ajax({
					type: "POST",
					url:"php/select_options_listar_provincias_por_pais.php",
					data:{id_pais:id_pais},
					success:function (data)
					{
						$("#id_provincia_m").html(data);

					},

				})

			}
		})

		$( "#add_localidad" ).submit(function( event ) {
			var parametros = $(this).serialize();
			$.ajax({
				type: "POST",
				url: "php/nuevo_localidad.php",
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

		$('#addLocalidadModal').on('show.bs.modal', function (event) {
			  //cargo lista desplegable paises
		  $.ajax({
		  	type: "POST",
		  	url:"php/select_options_listar_paises.php",
		  	success:function (data)
		  	{
		  		$("#id_pais").html(data);
		  	},

		  })

		})

		$('#deleteLocalidadModal').on('show.bs.modal', function (event) {
		  var button = $(event.relatedTarget) // Button that triggered the modal
		  var id = button.data('id') 
		  $('#delete_id').val(id)
		})
		
		$( "#delete_localidad" ).submit(function( event ) {
			var parametros = $(this).serialize();
			$.ajax({
				type: "POST",
				url: "php/eliminar_localidad.php",
				data: parametros,
				beforeSend: function(objeto){
					$("#resultados").html("Enviando...");
				},
				success: function(datos){
					$("#resultados").html(datos);
					load(1);
					$('#deleteLocalidadModal').modal('hide');
				}
			});
			event.preventDefault();
		});



		$('#editLocalidadModal').on('show.bs.modal', function (event) {
		  var button = $(event.relatedTarget); // Button that triggered the modal
		  var name = button.data('name') ;
		  $('#edit_name').val(name);
		  var id = button.data('id'); 
		  $('#edit_id').val(id);
		  var cp=button.data('cp');
		  $('#edit_cp').val(cp);
		  var id_provincia=button.data('idprovincia');	
		  var id_pais=button.data('idpais');

		  //cargo lista desplegable paises
		  $.ajax({
		  	type: "POST",
		  	url:"php/select_options_listar_paises.php",
		  	success:function (data)
		  	{
		  		$("#id_pais_m").html(data);
		  		$('select[name="id_pais_m"]').val(id_pais);
		  	},

		  })

		  //cargo lista desplegable provincias
		  $.ajax({
		  	type: "POST",
		  	url:"php/select_options_listar_provincias_por_pais.php",
		  	data:{id_pais:id_pais},
		  	success:function (data)
		  	{
		  		$("#id_provincia_m").html(data);
		  		$('select[name="id_provincia_m"]').val(id_provincia);
		  	},

		  })

		})


		$("#edit_localidad" ).submit(function( event ) {
			var parametros = $(this).serialize();
			$.ajax({
				type: "POST",
				url: "php/modificar_localidad.php",
				data: parametros,
				beforeSend: function(objeto){
					$("#resultados").html("Enviando...");
				},
				success: function(datos){
					$("#resultados").html(datos);
					load(1);
					$('#editLocalidadModal').modal('hide');
				}
			});
			event.preventDefault();
		});
		
