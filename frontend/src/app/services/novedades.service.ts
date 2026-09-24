import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { CarouselSlide } from '../pages/gestion-home/home-dashboard/home-dashboard.component';

@Injectable({
  providedIn: 'root'
})

export class NovedadesService {
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
}