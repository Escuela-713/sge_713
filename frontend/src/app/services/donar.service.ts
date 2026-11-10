import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_BASE = 'http://127.0.0.1:8000/api/v1/donar';

export interface CarruselSlideApi {
  id: number;
  titulo: string;
  descripcion: string;
  boton_texto: string;
  imagen: string;
  orden: number;
  activo: boolean;
}

export interface EventoApi {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  horario: string;
  lugar: string;
  imagen: string;
  estado: 'activo' | 'proximo' | 'historial';
}

export interface NoticiaApi {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  imagen: string;
  estado: 'reciente' | 'historial';
}

export type TipoInformacion = 'requisito' | 'pregunta';

export type IconoInformacion =
  | 'edad'
  | 'peso'
  | 'salud'
  | 'identificacion'
  | 'descanso'
  | 'alimentacion'
  | 'gota'
  | 'calendario';

export interface InformacionApi {
  id: number;
  tipo: TipoInformacion;
  titulo: string;
  descripcion: string;
  icono: IconoInformacion | '';
  orden: number;
  activo: boolean;
}

export type InformacionPayload = Omit<InformacionApi, 'id'>;

export interface DonarHomeData {
  carrusel: CarruselSlideApi[];
  eventosActivos: EventoApi[];
  eventosProximos: EventoApi[];
  noticias: NoticiaApi[];
  informacion: InformacionApi[];
}

@Injectable({ providedIn: 'root' })
export class DonarService {
  constructor(private http: HttpClient) {}

  getHomeData(): Observable<DonarHomeData> {
    return this.http.get<DonarHomeData>(`${API_BASE}/home-data/`);
  }

  getEventos(): Observable<EventoApi[]> {
    return this.http.get<EventoApi[]>(`${API_BASE}/eventos/`);
  }

  crearEvento(payload: FormData): Observable<EventoApi> {
    return this.http.post<EventoApi>(`${API_BASE}/eventos/`, payload);
  }

  actualizarEvento(id: number, payload: FormData): Observable<EventoApi> {
    return this.http.patch<EventoApi>(`${API_BASE}/eventos/${id}/`, payload);
  }

  eliminarEvento(id: number): Observable<void> {
    return this.http.delete<void>(`${API_BASE}/eventos/${id}/`);
  }

  getNoticias(): Observable<NoticiaApi[]> {
    return this.http.get<NoticiaApi[]>(`${API_BASE}/noticias/`);
  }

  crearNoticia(payload: FormData): Observable<NoticiaApi> {
    return this.http.post<NoticiaApi>(`${API_BASE}/noticias/`, payload);
  }

  actualizarNoticia(id: number, payload: FormData): Observable<NoticiaApi> {
    return this.http.patch<NoticiaApi>(`${API_BASE}/noticias/${id}/`, payload);
  }

  eliminarNoticia(id: number): Observable<void> {
    return this.http.delete<void>(`${API_BASE}/noticias/${id}/`);
  }

  getCarrusel(): Observable<CarruselSlideApi[]> {
    return this.http.get<CarruselSlideApi[]>(`${API_BASE}/carrusel/`);
  }

  crearSlide(payload: FormData): Observable<CarruselSlideApi> {
    return this.http.post<CarruselSlideApi>(`${API_BASE}/carrusel/`, payload);
  }

  actualizarSlide(id: number, payload: FormData): Observable<CarruselSlideApi> {
    return this.http.patch<CarruselSlideApi>(`${API_BASE}/carrusel/${id}/`, payload);
  }

  eliminarSlide(id: number): Observable<void> {
    return this.http.delete<void>(`${API_BASE}/carrusel/${id}/`);
  }

  getInformacion(): Observable<InformacionApi[]> {
    return this.http.get<InformacionApi[]>(`${API_BASE}/informacion/`);
  }

  crearInformacion(payload: InformacionPayload): Observable<InformacionApi> {
    return this.http.post<InformacionApi>(`${API_BASE}/informacion/`, payload);
  }

  actualizarInformacion(id: number, payload: InformacionPayload): Observable<InformacionApi> {
    return this.http.patch<InformacionApi>(`${API_BASE}/informacion/${id}/`, payload);
  }

  eliminarInformacion(id: number): Observable<void> {
    return this.http.delete<void>(`${API_BASE}/informacion/${id}/`);
  }
}
