import { Injectable } from '@angular/core';
import type { Carrera } from '../models/mesas-examenes.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarrerasService {
  private apiUrl = 'http://localhost:3000/carreras';

  constructor(private http: HttpClient) {}

  obtenerCarreras(): Observable<Carrera[]> {
    return this.http.get<Carrera[]>(this.apiUrl);
  }
}
