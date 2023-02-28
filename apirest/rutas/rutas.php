<?php

$rutas=array_filter( explode("/",$_SERVER['REQUEST_URI']));

//cuando no se hace ninguna petición a la API
if (count($rutas)==0)
{
    $json=array(
        'status' => 404,
        'result' => 'Not found'
    );
    
    echo json_encode($json, http_response_code($json["status"]));
    
    return;
}

require_once "controladores/persona.controlador.php";
require_once "controladores/materia.controlador.php";
require_once "controladores/usuario.controlador.php";

$endpoint = $rutas[1];


//Endpoint usuario (CRUD) 
if ($endpoint == "usuario")
{
    $response= new usuarioControlador();
    $response -> procesarPeticionHTTP($endpoint);
}
//Endpoint persona
if ($endpoint == "persona")
{
    $response= new PersonaControlador();
    $response -> procesarPeticionHTTP($endpoint);
}
//Endpoint Materias
/*if ($endpoint == "materia")
{
    $response= new MateriaControlador();
    $response -> procesarPeticionHTTP($endpoint);
    
}*/

?>