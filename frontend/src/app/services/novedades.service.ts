import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { CarouselSlide } from '../pages/gestion-home/home-dashboard/home-dashboard.component';

interface NovedadesData {
  slides: CarouselSlide[];
  cards: CarouselSlide[];
  }
  
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

interface NovedadesData {
  carouselSlides: CarouselSlide[];
  sectionTitle: string;
  cards: Publication[];
}

@Injectable({
  providedIn: 'root'
})
export class NovedadesService {
  private apiUrl = 'http://127.0.0.1:8000/api/v1/home/publications/';
  private carouselUrl = 'http://127.0.0.1:8000/carrousel/';

  constructor(private readonly http: HttpClient) {}

  // ---------- Lectura general ----------
  async getAll(): Promise<NovedadesData> {
    const [carouselSlides, cards] = await Promise.all([
      firstValueFrom(this.http.get<CarouselSlide[]>(this.carouselUrl)),
      firstValueFrom(this.http.get<Publication[]>(this.apiUrl)),
    ]);
    return {
      carouselSlides: carouselSlides ?? [],
      sectionTitle: '',
      cards: cards ?? [],
    };
  }

  // ---------- Publicaciones (Cards) ----------
  getCardById(id: number): Observable<Publication> {
    return this.http.get<Publication>(`${this.apiUrl}${id}/`);
  }

  addCard(newCard: Partial<Publication>): Observable<Publication> {
    return this.http.post<Publication>(this.apiUrl, newCard);
  }

  crearPublicacion(nuevaPublicacion: Omit<Publication, 'id'>): Observable<Publication> {
  return this.http.post<Publication>(this.apiUrl, nuevaPublicacion);
  // NUEVO método POST
  
  }

  updateCard(id: number, updatedCard: Partial<Publication>): Observable<Publication> {
    return this.http.patch<Publication>(`${this.apiUrl}${id}/`, updatedCard);
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

  // ---------- Legacy / compatibilidad ----------
  postNovedad(newNovedad: any): Observable<any> {
    return this.http.post(this.apiUrl, newNovedad);
  } 

  getPublicationById(id: number): Observable<Publication> {
    return this.http.get<Publication>(`${this.apiUrl}${id}/`);
  }

  getPublications(): Observable<any> {
    return this.http.get(this.apiUrl)
  }
}

