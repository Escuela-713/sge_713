<?php

    require_once "conexion.php";

    class Plan 
    {

        public static function listarPlan()
        {

            try
            {

            $obj = new Conexion();
            $con = $obj->connect();

            $sql=  "select * from plan";
            $result = $con->prepare($sql);
            $result->execute();

            $data = $result->fetchAll(PDO::FETCH_ASSOC);

            return $data;
        }
        catch (PDOException $e) {
            error_log($e, 3, "tb-errors.log");
            throw new Exception($e->getMessage(), $e->getCode());
        }
    }

    public static function crearPlan($plan, $id_carrera, $estado, $horas_reloj, $horas_catedra)
    {
        try {
            $obj = new Conexion();
            $con = $obj->connect();
    
            $sql=  "insert into plan(plan,estado,horas_catedra,horas_reloj) values ('$plan', $estado, $horas_catedra, $horas_reloj)";
            $result = $con->prepare($sql);
            $result->execute();
    
            $sql = "select max(id_plan) as id from plan";
            $result = $con->prepare($sql);
            $result->execute();
    
            $data = $result->fetchAll(PDO::FETCH_ASSOC);
    
            return $data;
        }
        catch (PDOException $e) {
            error_log($e, 3, "tb-errors.log");
            throw new Exception($e->getMessage(), $e->getCode());
        }
        
    }

    public static function eliminarPlan($id)
    {
        try
        {
            $obj = new Conexion();
            $con = $obj->connect();
    
            $sql=  "delete from plan where id_plan = $id";
     
            $result = $con->prepare($sql);
            $result->execute();
        }
        catch (PDOException $e) {
            error_log($e, 3, "tb-errors.log");
            throw new Exception($e->getMessage(), $e->getCode());
        }
        

    }

    public static function modificarPlan($id_plan, $id_carrera, $plan, $estado, $horas_catedra, $horas_reloj)
    {
        try{
            $obj = new Conexion();
            $con = $obj->connect();
    
            $sql=  "update plan set plan=$plan, estado=$estado, horas_reloj=$horas_reloj, horas_catedra=$horas_catedra, id_carrera=$id_carrera where id_plan=$id_plan";
    
            $result = $con->prepare($sql);
            $result->execute();
    
            $sql = "select * from plan where id_plan=$id_plan";
            $result = $con->prepare($sql);
            $result->execute();
    
            $data = $result->fetchAll(PDO::FETCH_ASSOC);
    
            return $data;
        }
        catch (PDOException $e) {
            $con->rollBack();
            error_log($e, 3, "tb-errors.log");
            throw new Exception($e->getMessage(), $e->getCode());
        }
        
    }


}