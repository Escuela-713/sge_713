import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import type { Materia } from '../models/mesas-examenes.model';

@Injectable({
  providedIn: 'root',
})
export class MateriasService {
  private apiUrl = 'http://localhost:3001/materias';

  constructor(private http: HttpClient) {}

  obtenerMaterias(): Observable<Materia[]> {
    return this.http.get<Materia[]>(this.apiUrl);
  }
}
