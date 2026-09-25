import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import type { Materia } from '../models/mesas-examenes.model'
import { environment } from '@/environments/environment.development'
import { ApiResponse } from '../models/responses.model'

@Injectable({
  providedIn: 'root',
})
export class MateriasService {
  private apiUrl = environment.API_URL

  constructor(private http: HttpClient) {}

  obtenerMaterias(): Observable<ApiResponse<Materia[]>> {
    return this.http.get<ApiResponse<Materia[]>>(`${this.apiUrl}/materia`)
  }
}
