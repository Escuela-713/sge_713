$(function() {
	load();
});

//Funcion que se ejecuta al iniciar el form. Lista los paises en el div loader
function load()
{			
	var parametros = {"action":"ajax"};
	$("#loader").fadeIn('slow');
	$.ajax({
		url:'php/listar_cursos.php',
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

$('#CursoModal').on('show.bs.modal', function (event) {
  	var button = $(event.relatedTarget); // Button that triggered the modal
	var id = button.data('id');
	if ( isNaN(id) )
	{
		$('#id').val('undefined');
		$('#anio').val('');
		$('#division').val('');
	}
	else
	{
		$('#titulo').text("Editar Curso");
		var anio = button.data('anio'); 
		$('#anio').val(anio);
		var division = button.data('division'); 
		$('#division').val(division);
		$('#id').val(id);
	}
});

$("#frm_curso" ).submit(function( event ) 
{			
	var parametros = $(this).serialize();
	$.ajax({
		type: "POST",
		url: "php/abm_curso.php",
		data: parametros,
		beforeSend: function(objeto){
			$("#resultados").html("Enviando...");
		},
		success: function(datos){
			$("#resultados").html(datos);
			load(1);
			$('#CargoModal').modal('hide');
		}
	});
	event.preventDefault();
});

$('#deleteModal').on('show.bs.modal', function (event) {
	var button = $(event.relatedTarget);
	var id = button.data('id');
	$('#delete_id').val(id);
	$('#titulo_eliminar').text("Eliminar Cargo");
});
		
$("#frm_delete").submit(function( event ) {
	var parametros = $(this).serialize();
	$.ajax({
		type: "POST",
		url: "php/abm_curso.php",
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

