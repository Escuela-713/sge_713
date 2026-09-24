import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { CarouselSlide } from '../pages/gestion-home/home-dashboard/home-dashboard.component';

@Injectable({
  providedIn: 'root'
})

export class NovedadesService {
  constructor(private readonly http: HttpClient) {}

  addSlide(arg0: { image: any; title: any; subtitle: any }): void {
    // Slides are managed by the consuming component.
  }

  getCardBySlug(slug: string): Observable<CarouselSlide> {
    return this.http.get<CarouselSlide>(`${this.apiUrl}${slug}`);
  }

  private apiUrl = 'http://127.0.0.1:8000/home/';
}
