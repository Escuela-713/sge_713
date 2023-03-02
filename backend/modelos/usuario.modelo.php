<?php

require_once "conexion.php";

class Usuario{

    

    public static function login($usuario, $contraseña)
    {
        try {
            $obj = new Conexion();
            $con = $obj->connect();
    
            $sql=  "select from usuario where  usuario =$usuario and contraseña=$contraseña  ";
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




        
    }


