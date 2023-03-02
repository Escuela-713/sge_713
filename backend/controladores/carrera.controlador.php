<?php
require_once "modelos/carrera.modelo.php";
class CarreraControlador
{
    public function procesarPeticionHTTP()
    {
        $data;
        $inputJson = json_decode(file_get_contents("php://input"), true);
        header('Content-type: application/json');
        // echo json_encode($inputJson);

        $titulo_egreso= (isset($inputJson['titulo_egreso'])) ? $inputJson['titulo_egreso'] : '';
        $estado= (isset($inputJson['estado'])) ? $inputJson['estado'] : '';
        $nombre= (isset($inputJson['nombre'])) ? $inputJson['nombre'] : '';
        $id=(isset($inputJson['id'])) ? $inputJson['id'] : '0';
        
        if ($_SERVER['REQUEST_METHOD']=="GET")
        {
            $data=Carrera::listarCarreras();
        }
    
        if ($_SERVER['REQUEST_METHOD']=="POST")
        {
            $data=Carrera::crearCarrera($nombre, $estado, $titulo_egreso);
        }
    
        if ($_SERVER['REQUEST_METHOD']=="PUT")
        {
           $data=Carrera::modificarCarrera($id, $nombre, $estado, $titulo_egreso);
        }
    
        if ($_SERVER['REQUEST_METHOD']=="DELETE")
        {
           $data=Carrera::eliminarCarrera($id);
        }

        $return= new CarreraControlador();
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
?>