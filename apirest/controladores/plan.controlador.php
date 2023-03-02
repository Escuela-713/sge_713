<?php
require_once "modelos/plan.modelo.php";
class PlanControlador
{
    public function procesarPeticionHTTP()
    {   
        $data;
        $inputJson = json_decode(file_get_contents("php://input"), true);
        header('Content-type: application/json');
        // echo json_encode($inputJson);

        $plan= (isset($inputJson['plan'])) ? $inputJson['plan'] : '0';
        $horas_catedra= (isset($inputJson['horas_catedras'])) ? $inputJson['horas_catedras'] : '0';
        $horas_reloj= (isset($inputJson['horas_reloj'])) ? $inputJson['horas_reloj'] : '0';
        $estado= (isset($inputJson['estado'])) ? $inputJson['estado'] : '0';
        $id_plan=(isset($inputJson['id_plan'])) ? $inputJson['id_plan'] : '0';
        $id_carrera=(isset($inputJson['id_carrera'])) ? $inputJson['id_carrera'] : '0';
        
        if ($_SERVER['REQUEST_METHOD']=="GET")
        {
            $data=Plan::listarPlan();
        }
    
        if ($_SERVER['REQUEST_METHOD']=="POST")
        {
            $data=Plan::crearPlan($plan, $id_carrera, $estado, $horas_catedra, $horas_reloj);
        }
    
        if ($_SERVER['REQUEST_METHOD']=="PUT")
        {
           $data=Plan::modificarPlan($id_plan, $id_carrera, $plan, $estado, $horas_reloj, $horas_catedra);
        }
    
        if ($_SERVER['REQUEST_METHOD']=="DELETE")
        {
           $data=Plan::eliminarPlan($id_plan);
        }

        $return= new PlanControlador();
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