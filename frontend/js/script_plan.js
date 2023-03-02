$(function() {
	load();
});

//Funcion que se ejecuta al iniciar el form. Lista los paises en el div loader
function load()
{			
	var parametros = {"action":"ajax"};
	$("#loader").fadeIn('slow');
	$.ajax({
		url:'php/listar_plan.php',
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

$('#deleteModal').on('show.bs.modal', function (event) {
	var button = $(event.relatedTarget); // Button that triggered the modal
	var id = button.data('id');
	$('#delete_id').val(id);
	$('#titulo_eliminar').text("Eliminar Plan");
});

$('#frm_delete' ).submit(function( event ) {
	var parametros = $(this).serialize();
	$.ajax({
		type: "POST",
		url: "php/abm_plan.php",
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

$('#PlanesModal').on('show.bs.modal', function (event) {
	var button = $(event.relatedTarget); // Button that triggered the modal
	var id = button.data('id');
	if (isNaN(id))
	{	
		$('#titulo').text("Nuevo Plan");
		$('#id').val('undefined');
		$('#name').val('');
	}
	else
	{ 
		var estado = button.data('estado');  
		var name = button.data('name'); 
		var horas_reloj=button.data('horas_reloj');
		var horas_catedra=button.data('horas_catedra');
		$('#titulo').text("Editar Plan");	
		$('#name').val(name);
		$('#id').val(id);
		$('#horas_reloj').val(horas_reloj);
		$('#horas_catedra').val(horas_catedra);
		$('select[name="estado"]').val(estado);
	}
});

/*$('#frm_plan' ).submit(function( event ) {
	var parametros = $(this).serialize();
	$.ajax({
		type: "POST",
		url: "php/abm_plan.php",
		data: parametros,
		beforeSend: function(objeto){
			$("#resultados").html("Enviando...");
		},
		success: function(datos){
			$("#resultados").html(datos);
			load(1);
			$('#PlanesModal').modal('hide');
		}
	});
	event.preventDefault();
}); */

function check()
{
	let check_campo_complet=true;
    let name= document.forms["frm_plan"]["name"].value;
    let descripcion= document.forms["frm_plan"]["descripcion"].value;
    let id=0;
		if (document.forms["frm_plan"].checkValidity())	
		{
			console.log(document.forms["frm_plan"].checkValidity());
			$.ajax({
				type: "POST",
				url: "php/abm_plan.php",
				datatype: "json",
                data: {name:name, descripcion:descripcion, id:id},
				beforeSend: function(objeto){
					$("#resultados").html("Enviando...");
				},
				success: function(datos){
					$("#resultados").html(datos);
					load(1);
					$('#PlanesModal').modal('hide');
				}
			});
		}
		else
		{
			check_campo_complet=false;
		}
	
		return check_campo_complet;
} 