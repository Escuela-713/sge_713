export interface Evento {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  imagen: string;
  estado: 'activo' | 'historial';
}

export interface Noticia {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  imagen: string;
  estado: 'reciente' | 'historial';
}
