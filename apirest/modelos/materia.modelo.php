<?php

    require_once "conexion.php";

    class Materia 
    {

        public static function listarMaterias()
        {

            try
            {

            $obj = new Conexion();
            $con = $obj->connect();

            $sql=  "select * from materia";
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
    
            $sql=  "insert into materia(nombre,descripcion) values ('$nombre', '$descripcion')";
            $result = $con->prepare($sql);
            $result->execute();
    
            $sql = "select max(id_materia) from materia";
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
    
            $sql=  "delete from materia where id_materia = $id";
     
            $result = $con->prepare($sql);
            $result->execute();
        }
        catch (PDOException $e) {
            error_log($e, 3, "tb-errors.log");
            throw new Exception($e->getMessage(), $e->getCode());
        }
        

    }


    public static function modificarMateria($id_materia, $nombre, $descripcion)
    {
        try{
            $obj = new Conexion();
            $con = $obj->connect();
    
            $sql=  "update materia set nombre='$nombre', descripcion='$descripcion' where id=$id_materia";
    
            $result = $con->prepare($sql);
            $result->execute();
    
            $sql = "select * from materia where id_materia=$id_materia";
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
