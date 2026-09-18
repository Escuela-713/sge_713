import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Mesa } from '../models/mesas-examenes.model'
import { environment } from '@/environments/environment.development'

@Injectable({
  providedIn: 'root',
})
export class MesasExamenesService {
  private apiUrl = environment.API_URL

  constructor(private http: HttpClient) {}

  obtenerMesas(): Observable<Mesa[]> {
    return this.http.get<Mesa[]>(`${this.apiUrl}/mesas_examenes`)
  }
}
