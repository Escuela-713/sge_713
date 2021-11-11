
    //cargo lista paises
	$.ajax({
	  	type: "POST",
	  	url:"php/select_options_listar_paises.php",
	  	success:function (data)
	  	{
	  		$("#id_pais").html(data);
	  		$("#id_pais_d").html(data);

	  		if (isNaN(id))
			{
				$('#id_pais').change();
				$('#id_pais_d').change();
			}
			
	  	},
	})
    
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
                    $('#id_provincia').html(data);
                    $('#id_provincia').change();
                }
                })
        }
    });

    $('#id_pais_d').on('change',function(){
        var id_pais=this.value;
        if (!isNaN(id_pais))
        {
            $.ajax({
                type: "POST",
                url:"php/select_options_listar_provincias_por_pais.php",
                data:{id_pais:id_pais},
                success:function (data)
                {
                    $("#id_provincia_d").html(data);
                    $('#id_provincia_d').change();
                }
                })
        }
    });

    $('#id_provincia').on('change',function(){
        var id_provincia=this.value;
        if (!isNaN(id_provincia))
             {
                $.ajax({
                    type: "POST",
                    url:"php/select_options_listar_localidades_por_provincias.php",
                    data:{id_provincia:id_provincia},
                    success:function (data)
                    {
                        $("#id_localidad").html(data);
                    }
                })
            }
    });
    
    $('#id_provincia_d').on('change',function(){
        var id_provincia=this.value;
        if (!isNaN(id_provincia))
        {
            $.ajax({
                type: "POST",
                url:"php/select_options_listar_localidades_por_provincias.php",
                data:{id_provincia:id_provincia},
                success:function (data)
                {
                    $("#id_localidad_d").html(data);
                }
            })
        }
    })
    

    //cargo lista paises
	$.ajax({
        type: "POST",
        url:"php/select_options_listar_paises.php",
        success:function (data)
        {
            $("#id_pais_tutores").html(data);
            $("#id_pais_d_tutores").html(data);

            if (isNaN(id))
          {
              $('#id_pais_tutores').change();
              $('#id_pais_d_tutores').change();
          }
          
        },
  })
  
  $('#id_pais_tutores').on('change',function(){
      var id_pais=this.value;
      if (id_pais)
      {
          $.ajax({
              type: "POST",
              url:"php/select_options_listar_provincias_por_pais.php",
              data:{id_pais:id_pais},
              success:function (data)
              {
                  $('#id_provincia_tutores').html(data);
                  $('#id_provincia_tutores').change();
              }
              })
      }
  });

  $('#id_pais_d_tutores').on('change',function(){
      var id_pais=this.value;
      if (!isNaN(id_pais))
      {
          $.ajax({
              type: "POST",
              url:"php/select_options_listar_provincias_por_pais.php",
              data:{id_pais:id_pais},
              success:function (data)
              {
                  $("#id_provincia_d_tutores").html(data);
                  $('#id_provincia_d_tutores').change();
              }
              })
      }
  });

  $('#id_provincia_tutores').on('change',function(){
      var id_provincia=this.value;
      if (!isNaN(id_provincia))
           {
              $.ajax({
                  type: "POST",
                  url:"php/select_options_listar_localidades_por_provincias.php",
                  data:{id_provincia:id_provincia},
                  success:function (data)
                  {
                      $("#id_localidad_tutores").html(data);
                  }
              })
          }
  });
  
  $('#id_provincia_d_tutores').on('change',function(){
      var id_provincia=this.value;
      if (!isNaN(id_provincia))
      {
          $.ajax({
              type: "POST",
              url:"php/select_options_listar_localidades_por_provincias.php",
              data:{id_provincia:id_provincia},
              success:function (data)
              {
                  $("#id_localidad_d_tutores").html(data);
              }
          })
      }
  })

      //cargo lista estado civil del tutor
	$.ajax({
        type: "POST",
      url:"php/select_options_listar_estados_civil.php",
      success:function (data)
      {
          $("#id_estado_civil_tutor").html(data);	
      },
  });
        //cargo lista estado civil de la madre
	$.ajax({
        type: "POST",
      url:"php/select_options_listar_estados_civil.php",
      success:function (data)
      {
          $("#id_estado_civil_madre").html(data);	
      },
  });

        //cargo lista estado civil del padre
	$.ajax({
        type: "POST",
      url:"php/select_options_listar_estados_civil.php",
      success:function (data)
      {
          $("#id_estado_civil_padre").html(data);	
      },
  });