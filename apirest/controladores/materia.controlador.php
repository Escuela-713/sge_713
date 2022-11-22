<?php
require_once "modelos/materia.modelo.php";
class MateriaControlador
{
    public function procesarPeticionHTTP()
    {
        $data;
        $inputJson = json_decode(file_get_contents("php://input"), true);
        header('Content-type: application/json');
        // echo json_encode($inputJson);

        $descripcion= (isset($inputJson['descripcion'])) ? $inputJson['descripcion'] : '';
        $nombre= (isset($inputJson['nombre'])) ? $inputJson['nombre'] : '';
        $id=(isset($inputJson['id'])) ? $inputJson['id'] : '0';
        
        if ($_SERVER['REQUEST_METHOD']=="GET")
        {
            $data=Materia::listarMaterias();
        }
    
        if ($_SERVER['REQUEST_METHOD']=="POST")
        {
            $data=Materia::crearMateria($nombre, $descripcion);
        }
    
        if ($_SERVER['REQUEST_METHOD']=="PUT")
        {
           $data=Materia::modificarMateria($id, $nombre, $descripcion);
        }
    
        if ($_SERVER['REQUEST_METHOD']=="DELETE")
        {
           $data=Materia::eliminarMateria($id);
        }

        $return= new MateriaControlador();
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