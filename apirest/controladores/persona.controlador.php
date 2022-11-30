<?php
require_once "modelos/persona.modelo.php";

class PersonaControlador {

    public function procesarPeticionHTTP(){

        $data;
        $inputJson = json_decode(file_get_contents("php://input"), true);
        header('Content-type: application/json');
        // echo json_encode($inputJson);

        $usuario= (isset($inputJson['usuario'])) ? $inputJson['usuario'] : '';
        $contraseña= (isset($inputJson['contraseña'])) ? $inputJson['contraseña'] : '';
       
        
        if ($_SERVER['REQUEST_METHOD']=="GET")
        {
            $data=Persona::listarPersonas();
        }
    
        if ($_SERVER['REQUEST_METHOD']=="POST")
        {
            $data=Persona::crearPersona($nombre, $apellido, $dni, $grupo_sanguineo, $telefono, $calle, $contacto);
        }
    
        if ($_SERVER['REQUEST_METHOD']=="PUT")
        {
           $data=Persona::modificarPersona($id, $nombre, $apellido);
        }
    
        if ($_SERVER['REQUEST_METHOD']=="DELETE")
        {
           $data=Persona::eliminarPersona($id);
        }

        $return= new PersonaControlador();
        $return -> response($data);
    }

    public function response($data)
    {
        if (!empty($data) || $_SERVER['REQUEST_METHOD']=="DELETE")
        {
            $json=array(
                'status' => 200,
                'result' => $data
            );
        }
        else 
        {
            $json=array(
                'status' => 404,
                'result' => $data,
            );

        }
            
        echo json_encode($json, http_response_code($json["status"]));
    }
}