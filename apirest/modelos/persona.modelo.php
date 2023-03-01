<?php

require_once "conexion.php";

class Persona {

    public static function listarPersonas(){

        try{

            $obj = new Conexion();
            $con = $obj->connect();

            $sql=  "select * from persona";
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

    public static function crearPersona($nombre, $apellido, $dni, $grupo_sanguineo, $telefono, $calle, $contacto)
    {
        try {
            $obj = new Conexion();
            $con = $obj->connect();
    
            $sql=  "insert into persona(nombre, apellido, dni, grupo_sanguineo, telefono, calle, contacto) values ('$nombre', '$apellido','$dni','$grupo_sanguineo','$telefono','$calle','$contacto' )";
            $result = $con->prepare($sql);
            $result->execute();
    
            $sql = "select max(id_persona) from persona";

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

    public static function eliminarPersona($id)
    {
        try
        {
            $obj = new Conexion();
            $con = $obj->connect();
    
            $sql=  "delete from persona where id = $id";
     
            $result = $con->prepare($sql);
            $result->execute();
        }
        catch (PDOException $e) {
            error_log($e, 3, "tb-errors.log");
            throw new Exception($e->getMessage(), $e->getCode());
        }
       
    }

    public static function modificarPersona($id, $nombre, $apellido)
    {
        try{
            $obj = new Conexion();
            $con = $obj->connect();
    
            $sql=  "update persona set nombre='$nombre', apellido='$apellido' where id=$id";
    
            $result = $con->prepare($sql);
            $result->execute();
    
            $sql = "select * from persona where id=$id";

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