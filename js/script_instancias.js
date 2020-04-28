$(function() {
	load();
});

//Funcion que se ejecuta al iniciar el form. Lista los paises en el div loader
function load()
{			
	var parametros = {"action":"ajax"};
	$("#loader").fadeIn('slow');
	$.ajax({
		url:'php/listar_instancias.php',
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

