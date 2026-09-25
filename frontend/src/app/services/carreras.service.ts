import { Injectable } from '@angular/core'
import type { Carrera } from '../models/mesas-examenes.model'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '@/environments/environment.development'
import { ApiResponse } from '../models/responses.model'

@Injectable({
  providedIn: 'root',
})
export class CarrerasService {
  private apiUrl = `${environment.API_URL}/carrera`

  constructor(private http: HttpClient) {}

  obtenerCarreras(): Observable<ApiResponse<Carrera[]>> {
    return this.http.get<ApiResponse<Carrera[]>>(this.apiUrl)
  }
}
