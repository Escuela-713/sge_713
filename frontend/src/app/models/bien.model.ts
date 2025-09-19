export interface Bien {
  id: string;
  nombre: string;
  codigo: string;
  ubicacion: string;
  cantidad: number;
  estado: 'Bueno' | 'Regular' | 'Necesita reparación';
  descripcion: string;
  categoria: string;
  fechaRegistro: Date;
  ultimaActualizacion: Date;
}