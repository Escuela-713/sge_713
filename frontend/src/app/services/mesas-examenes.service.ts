import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mesa } from '../models/mesas-examenes.model';

@Injectable({
  providedIn: 'root',
})
export class MesasExamenesService {
  private apiUrl = 'http://localhost:3002/mesas';

  constructor(private http: HttpClient) {}

  obtenerMesas(): Observable<Mesa[]> {
    return this.http.get<Mesa[]>(this.apiUrl);
  }
}
