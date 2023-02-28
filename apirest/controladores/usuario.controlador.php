<?php
require_once "modelos/usuario.modelo.php";

class UsuarioControlador {

    public function procesarPeticionHTTP(){

        $data;
        $inputJson = json_decode(file_get_contents("php://input"), true);
        header('Content-type: application/json');
        // echo json_encode($inputJson);

        $usuario= (isset($inputJson['usuario'])) ? $inputJson['usuario'] : '';
        $contraseña= (isset($inputJson['contraseña'])) ? $inputJson['contraseña'] : '';
       
        
    
    
        if ($_SERVER['REQUEST_METHOD']=="POST")
        {
            $data=Usuario::crearUsuario($usuario, $contraseña);
        }

        $return= new UsuarioControlador();
        $return -> response($data);
    }

}