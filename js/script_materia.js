$(function() {
	load();
});

//Funcion que se ejecuta al iniciar el form. Lista los paises en el div loader
function load()
{			
	var parametros = {"action":"ajax"};
	$("#loader").fadeIn('slow');
	$.ajax({
		url:'php/listar_materias.php',
		data: parametros,
		beforeSend: function(objeto){
			$("#loader").html("cargando...");
		},
		success:function(data){
			$(".outer_div").html(data).fadeIn('slow');
			$("#loader").html("");
		}
	})
};

$('#deleteModal').on('show.bs.modal', function (event) {
	var button = $(event.relatedTarget); // Button that triggered the modal
	var id = button.data('id');
	$('#delete_id').val(id);
	$('#titulo_eliminar').text("Eliminar Materia");
});

$('#frm_delete' ).submit(function( event ) {
	var parametros = $(this).serialize();
	$.ajax({
		type: "POST",
		url: "php/abm_materia.php",
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

$('#MateriasModal').on('show.bs.modal', function (event) {
	var button = $(event.relatedTarget); // Button that triggered the modal
	var id = button.data('id');
	if (isNaN(id))
	{	
		$('#titulo').text("Nueva Materia");
		$('#id').val('undefined');
		$('#name').val('');
		$('#descripcion').val('');
	}
	else
	{ 
		
		$('#titulo').text("Editar Materia");	
		var name = button.data('name'); 
		var descripcion= button.data('descripcion');
		$('#descripcion').val(descripcion);
		$('#name').val(name);
		$('#id').val(id);
	
	}
});

$('#frm_materia' ).submit(function( event ) {
	var parametros = $(this).serialize();
	$.ajax({
		type: "POST",
		url: "php/abm_materia.php",
		data: parametros,
		beforeSend: function(objeto){
			$("#resultados").html("Enviando...");
		},
		success: function(datos){
			$("#resultados").html(datos);
			load(1);
			$('#MateriasModal').modal('hide');
		}
	});
	event.preventDefault();
});