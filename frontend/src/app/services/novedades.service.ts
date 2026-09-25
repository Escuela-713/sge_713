import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { CarouselSlide } from '../pages/gestion-home/home-dashboard/home-dashboard.component';

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
  addSlide(arg0: { image: any; title: any; subtitle: any; }) {
  getCardBySlug(slug: string) {
    throw new Error("Method not implemented.");
  }
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
  private apiUrl = 'http://127.0.0.1:8000/home/';
  constructor(private http: HttpClient) {}

  postNovedad(newNovedad: any): Observable<any> {
    return this.http.post(this.apiUrl, newNovedad);
  } 
}