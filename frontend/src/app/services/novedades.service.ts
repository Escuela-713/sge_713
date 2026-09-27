import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { CarouselSlide } from '../pages/gestion-home/home-dashboard/home-dashboard.component';

export interface Publication {
  id: number;
  title: string;
  content: string;
  image: string;
  categoria: number;
  is_published: boolean;
  upload_date: string;
  update_date: string;
}

export interface NovedadesData {
  carouselSlides: CarouselSlide[];
  sectionTitle: string;
  cards: Publication[];
}

@Injectable({
  providedIn: 'root',
})
export class NovedadesService {
  private apiUrl = 'http://127.0.0.1:8000/api/v1/home/publications/';
  private carouselUrl = 'http://127.0.0.1:8000/api/v1/home/carrousel/';

  constructor(private readonly http: HttpClient) {}

  // ---------- Lectura general ----------
  getAll(): Observable<NovedadesData> {
    return forkJoin({
      carouselSlides: this.http.get<CarouselSlide[]>(this.carouselUrl),
      cards: this.http.get<Publication[]>(this.apiUrl),
    }).pipe(
      map(({ carouselSlides, cards }) => ({
        carouselSlides: carouselSlides ?? [],
        sectionTitle: '',
        cards: cards ?? [],
      }))
    );
  }

  // ---------- Publicaciones (Cards) ----------
  getCardById(id: number): Observable<Publication> {
    return this.http.get<Publication>(`${this.apiUrl}${id}/`);
  }

  // Crea una publicación. Recibe los datos y, opcionalmente, un archivo de imagen.
  // Si se pasa imageFile, arma un FormData (necesario para subir archivos).
  crearPublicacion(
    nuevaPublicacion: Omit<Publication, 'id' | 'image' | 'upload_date' | 'update_date'>,
    imageFile: File
  ): Observable<Publication> {
    const formData = new FormData();
    formData.append('title', nuevaPublicacion.title);
    formData.append('content', nuevaPublicacion.content);
    formData.append('categoria', String(nuevaPublicacion.categoria));
    formData.append('is_published', String(nuevaPublicacion.is_published));
    formData.append('image', imageFile, imageFile.name);

    return this.http.post<Publication>(this.apiUrl, formData);
  }

  // Actualiza una publicación. La imagen es opcional: si no se manda,
  // el backend conserva la imagen existente.
  updateCard(
    id: number,
    updatedCard: Partial<Omit<Publication, 'id' | 'image'>>,
    imageFile?: File
  ): Observable<Publication> {
    const formData = new FormData();
    if (updatedCard.title !== undefined) formData.append('title', updatedCard.title);
    if (updatedCard.content !== undefined) formData.append('content', updatedCard.content);
    if (updatedCard.categoria !== undefined) formData.append('categoria', String(updatedCard.categoria));
    if (updatedCard.is_published !== undefined) formData.append('is_published', String(updatedCard.is_published));
    if (imageFile) formData.append('image', imageFile, imageFile.name);

    return this.http.patch<Publication>(`${this.apiUrl}${id}/`, formData);
  }

  deleteCardById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
  }

  // ---------- Slides del Carousel ----------
  addSlide(newSlide: Partial<CarouselSlide>): Observable<CarouselSlide> {
    return this.http.post<CarouselSlide>(this.carouselUrl, newSlide);
  }

  updateSlide(slideEditado: CarouselSlide): Observable<CarouselSlide> {
    return this.http.patch<CarouselSlide>(`${this.carouselUrl}${slideEditado.id}/`, slideEditado);
  }

  deleteSlideById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.carouselUrl}${id}/`);
  }
}