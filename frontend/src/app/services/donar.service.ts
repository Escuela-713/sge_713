import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_BASE = 'http://127.0.0.1:8000/api/donar';

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
  fecha: string; // ISO yyyy-MM-dd
  horario: string;
  lugar: string;
  imagen: string;
  estado: 'activo' | 'proximo' | 'historial';
}

export interface NoticiaApi {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string; // ISO yyyy-MM-dd
  imagen: string;
  estado: 'reciente' | 'historial';
}

export interface DonarHomeData {
  carrusel: CarruselSlideApi[];
  eventosActivos: EventoApi[];
  eventosProximos: EventoApi[];
}

@Injectable({ providedIn: 'root' })
export class DonarService {
  constructor(private http: HttpClient) {}

  // --- Datos públicos para la home de Donar 713 (carrusel + eventos) ---
  getHomeData(): Observable<DonarHomeData> {
    return this.http.get<DonarHomeData>(`${API_BASE}/home-data/`);
  }

  // --- Eventos ---
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

  // --- Noticias ---
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

  // --- Carrusel (lectura pública; sin panel de edición propio por ahora) ---
  getCarrusel(): Observable<CarruselSlideApi[]> {
    return this.http.get<CarruselSlideApi[]>(`${API_BASE}/carrusel/`);
  }
}
