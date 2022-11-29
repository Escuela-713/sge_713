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
require_once "controladores/plan.controlador.php";

$endpoint = $rutas[1];


//Endpoint PERSONA (CRUD) 
if ($endpoint == "persona")
{
    $response= new PersonaControlador();
    $response -> procesarPeticionHTTP($endpoint);
}

if ($endpoint == "materia")
{
    $response= new MateriaControlador();
    $response -> procesarPeticionHTTP($endpoint);
}

if ($endpoint == "plan")
{
    $response= new PlanControlador();
    $response -> procesarPeticionHTTP($endpoint);
}
?>