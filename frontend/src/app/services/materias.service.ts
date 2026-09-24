import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import type { Materia } from '../models/mesas-examenes.model'
import { environment } from '@/environments/environment.development'

@Injectable({
  providedIn: 'root',
})
export class MateriasService {
  private apiUrl = environment.API_URL

  constructor(private http: HttpClient) {}

  obtenerMaterias(): Observable<Materia[]> {
    return this.http.get<Materia[]>(`${this.apiUrl}/materia`)
  }
}
