export interface Evento {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  horario: string;
  lugar: string;
  imagen: string;
  estado: 'activo' | 'proximo' | 'historial';
}

export interface Noticia {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  imagen: string;
  estado: 'reciente' | 'historial';
}

export interface Slide {
  id: number;
  titulo: string;
  descripcion: string;
  botonTexto: string;
  imagen: string;
  orden: number;
  activo: boolean;
}

export interface Informacion {
  id: number;
  tipo: 'requisito' | 'pregunta';
  titulo: string;
  descripcion: string;
  icono: string;
  orden: number;
  activo: boolean;
}
