<?php

class empleado 
{	
	private $sql;
	
	public $nombre;
	public $apellido;
	public $fecha_ingreso;
	public $legajo;
	public $id_cargo;
	public $sexo;
	public $fecha_nacimiento;
	public $id_estado_civil;
	public $dni;
	public $calle;
	public $numero;
	public $barrio;
	public $telefono;
	public $id_pais;
	public $id_provincia;
	public $id_localidad;
	public $id_pais_nac;
	public $id_provincia_nac;
	public $id_localidad_nac;

	public function __construct($id=0)
	{
		include("conexion.php");
		if($id!=0)
		{
			$sql= mysqli_query($con, "CALL obtener_empleado($id);");
			
			while($row = mysqli_fetch_array($sql))
			{
				$this->nombre=$row['nombre'];
				$this->apellido=$row['apellido'];
				$this->fecha_ingreso=$row['fecha_de_ingreso'];
				$this->legajo=$row['legajo'];
				$this->id_cargo=$row['id_cargo'];
				$this->sexo=$row['sexo'];
				$this->fecha_nacimiento=$row['fecha_nacimiento'];
				$this->id_estado_civil=$row['id_estado_civil'];
				$this->dni=$row['dni'];
				$this->calle=$row['calle'];
				$this->numero=$row['numero'];
				$this->barrio=$row['barrio'];
				$this->telefono=$row['telefono'];
				$this->id_provincia=$row['id_provincia'];
				$this->id_localidad=$row['id_localidad'];
				$this->id_pais=$row['id_pais'];
				$this->id_pais_nac=$row['id_pais_nac'];
				$this->id_provincia_nac=$row['id_provincia_nac'];
				$this->id_localidad_nac=$row['id_localidad_nac'];
			}
		}
	}

	public function obtener_empleados()
	{
		include("conexion.php");
		$sql= mysqli_query($con, "CALL obtener_empleados();");
		return $sql;	
	}

	public function obtener_empleado_por_id($id)
	{
		include("conexion.php");
		$sql= mysqli_query($con, "CALL obtener_empleado($id);");
		return $sql;
	}

	public function nuevo_empleado($nombre, $apellido,$sexo,$fecha_nacimiento,$estado_civil,$dni,$calle,$numero,$barrio,$telefono,$id_localidad_residencia,$fecha_ingreso,$legajo,$id_cargo,$id_localidad_nacimiento)
	{
		include("conexion.php");
		$sql = mysqli_query($con,"call nuevo_empleado('".$nombre."','".$apellido."','".$sexo."','".$fecha_nacimiento."',".$estado_civil.",".$dni.",'".$calle."',".$numero.",'".$barrio."','".$telefono."',".$id_localidad_residencia.",'".$fecha_ingreso."',".$legajo.",".$id_cargo.",".$id_localidad_nacimiento.")");
		return $sql;
	}

	public function modificar_empleado($id_empleado,$nombre, $apellido,$sexo,$fecha_nacimiento,$estado_civil,$dni,$calle,$numero,$barrio,$telefono,$id_localidad_residencia,$fecha_ingreso,$legajo,$id_cargo,$id_localidad_nacimiento)
	{
		include("conexion.php");
		error_log("CLS MODIFICAR EMPLEADO");
		
		$sql = mysqli_query($con,"call modificar_empleado(".$id_empleado.",'".$nombre."','".$apellido."','".$sexo."','".$fecha_nacimiento."',".$estado_civil.",".$dni.",'".$calle."',".$numero.",'".$barrio."','".$telefono."',".$id_localidad_residencia.",'".$fecha_ingreso."',".$legajo.",".$id_cargo.",".$id_localidad_nacimiento.")");
		return $sql;
	}

	public function eliminar_empleado($id)
	{
		include("conexion.php");
		$sql= mysqli_query($con, "CALL eliminar_empleado($id);");
		return $sql;
	}	
}
?>