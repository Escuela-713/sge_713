<?php
require_once "conexion.php";

class Materia
{
    public static function listarMateria(){

        try{

            $obj = new Conexion();
            $con = $obj->connect();

            $sql=  "select * from materias";
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

    public static function crearMateria($nombre, $descripcion)
    {
        try {
            $obj = new Conexion();
            $con = $obj->connect();
    
            $sql=  "insert into materias(nombre,descripcion) values ('$nombre', '$descripcion')";
            $result = $con->prepare($sql);
            $result->execute();
    
            $sql = "select max(id_materia) from materias";
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

    public static function eliminarMateria($id)
    {
        try
        {
            $obj = new Conexion();
            $con = $obj->connect();
    
            $sql=  "delete from materias where id = $id";
     
            $result = $con->prepare($sql);
            $result->execute();
        }
        catch (PDOException $e) {
            error_log($e, 3, "tb-errors.log");
            throw new Exception($e->getMessage(), $e->getCode());
        }
        

    }

    public static function modificarMateria($id, $nombre, $descripcion)
    {
        try{
            $obj = new Conexion();
            $con = $obj->connect();
    
            $sql=  "update materias set nombre='$nombre', descripcion='$descripcion' where id=$id";
    
            $result = $con->prepare($sql);
            $result->execute();
    
            $sql = "select * from materias where id=$id";
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