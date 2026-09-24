import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { Observable } from 'rxjs'
import { Mesa } from '../models/mesas-examenes.model'
import { environment } from '@/environments/environment.development'

@Injectable({
  providedIn: 'root',
})
export class MesasExamenesService {
  private http =  inject(HttpClient)
  private apiUrl = environment.API_URL

  obtenerMesas(): Observable<Mesa[]> {
    return this.http.get<Mesa[]>(`${this.apiUrl}/mesas_examenes`)
  }

  subirMesa(nuevaMesa: Mesa) {
    return this.http.post(`${this.apiUrl}/mesas_examenes`, nuevaMesa)
  }
}
