$(function() {
	load(1);
});

		//Función que refresca la tabla
		function load(page){
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

		//Evento que se ejecuta cuando el usuario cambia la selección 
		//de la lista desplegable en el modal nuevo.
		$('#id_pais').on('change',function(){
			var id_pais=this.value;

			if (!isNaN(id_pais))
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

		//Evento que se ejecuta cuando el usuario presiona el botón enviar.
		$( "#frm_localidad" ).submit(function( event ) {
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
					$('#LocalidadModal').modal('hide');
				}
			});
			event.preventDefault();
		});

		//Evento que se ejecuta cuando se inicia el modal agregar.
		$('#LocalidadModal').on('show.bs.modal', function (event) {
		  var button = $(event.relatedTarget); // Button that triggered the modal
		  var id = button.data('id');
		  var id_provincia=button.data('idprovincia');	
		  var id_pais=button.data('idpais');
		
		  //cargo lista desplegable paises
		  $.ajax({
		  	type: "POST",
		  	url:"php/select_options_listar_paises.php",
		  	success:function (data)
		  	{
		  		$("#id_pais").html(data);
		  		if (!isNaN(id_pais))
		  		{
		  			$('select[name="id_pais"]').val(id_pais);
		  		}
		  	},

		  })

		  //cargo la lista de provincias
		  $.ajax({
		  	type: "POST",
		  	url:"php/select_options_listar_provincias_por_pais.php",
		  	data:{id_pais:id_pais},
		  	success:function (data)
		  	{
		  		$("#id_provincia").html(data);
		  		if (!isNaN(id_provincia))
		  		{
		  			$('select[name="id_provincia"]').val(id_provincia);
		  		}
		  	},

		  })

		  if (isNaN(id))
		  {
		  	$('#titulo').text("Nueva Localidad");
		  	$('#id').val('undefined');
		  	$('#name').val('');
		  	$('cp').val('');
		  }
		  else
		  {
		  	  //Modificar registro
		  	  $('#titulo').text("Editar Localidad");	
		  	  $('#id').val(id);
		  	  var name = button.data('name');
		  	  $('#name').val(name);
		  	  var cp=button.data('cp');
		  	  $('#cp').val(cp);
		  	}
		  });


		//Evento que se ejecuta cuando se inicia el modal eliminar
		$('#deleteModal').on('show.bs.modal', function (event) {
		  var button = $(event.relatedTarget); // Button that triggered the modal
		  var id = button.data('id');
		  $('#delete_id').val(id);
		  $('#titulo_eliminar').text("Eliminar Localidad");
		})
		
		//Evento que se ejecuta cuando el usuario presiona el botón enviar del modal eliminar.
		$( "#frm_delete" ).submit(function( event ) {
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
					$('#deleteModal').modal('hide');
				}
			});
			event.preventDefault();
		});




		
