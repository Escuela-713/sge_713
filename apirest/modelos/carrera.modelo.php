<?php
require_once "conexion.php";

class Carrera
{
    public static function listarCarreras(){

        try{

            $obj = new Conexion();
            $con = $obj->connect();

            $sql=  "select * from carrera";
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

    public static function crearCarrera($nombre, $estado, $titulo_egreso)
    {
        try {
            $obj = new Conexion();
            $con = $obj->connect();
    
            $sql=  "insert into carrera(nombre,estado,titulo_egreso) values ('$nombre', $estado, '$titulo_egreso')";
            $result = $con->prepare($sql);
            $result->execute();
    
            $sql = "select max(id_carrera) from carrera";
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

    public static function eliminarCarrera($id)
    {
        try
        {
            $obj = new Conexion();
            $con = $obj->connect();
    
            $sql=  "delete from carrera where id_carrera = $id";
     
            $result = $con->prepare($sql);
            $result->execute();
        }
        catch (PDOException $e) {
            error_log($e, 3, "tb-errors.log");
            throw new Exception($e->getMessage(), $e->getCode());
        }
        

    }

    public static function modificarCarrera($id, $nombre, $estado, $titulo_egreso)
    {
        try{
            $obj = new Conexion();
            $con = $obj->connect();
    
            $sql=  "update carrera set nombre='$nombre', estado=$estado, titulo_egreso='$titulo_egreso' where id_carrera=$id";
    
            $result = $con->prepare($sql);
            $result->execute();
    
            $sql = "select * from carrera where id_carrera=$id";
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

?>