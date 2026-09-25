import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { CarouselSlide } from '../pages/gestion-home/home-dashboard/home-dashboard.component';

interface NovedadesData {
  slides: CarouselSlide[];
  cards: CarouselSlide[];
  }
  
export interface Publication {
  id : string
	title : string
	content : string
	image : string
  categoria: number;
	is_published : boolean 
	upload_date : string
	update_date : string
}

@Injectable({
  providedIn: 'root'
})
export class NovedadesService {
  deleteSlideById(id: number) {
    throw new Error('Method not implemented.');
  }
  deleteCardById(id: number) {
    throw new Error('Method not implemented.');
  }
  getAll(): NovedadesData | PromiseLike<NovedadesData> {
    throw new Error('Method not implemented.');
  }
  updateSlide(slideEditado: CarouselSlide) {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly http: HttpClient) {}

  addSlide(arg0: { image: any; title: any; subtitle: any }): void {
    // Slides are managed by the consuming component.
  }

  getCardBySlug(slug: string): Observable<CarouselSlide> {
    return this.http.get<CarouselSlide>(`${this.apiUrl}${slug}`);
  }

  private apiUrl = 'http://127.0.0.1:8000/home/';
<<<<<<< HEAD
}
=======
  constructor(private http: HttpClient) {}

  postNovedad(newNovedad: any): Observable<any> {
    return this.http.post(this.apiUrl, newNovedad);
  } 
}
>>>>>>> angeles
