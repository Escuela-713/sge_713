import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { Observable } from 'rxjs'
import {
  FiltroMesaExamen,
  Inscripcion,
  Mesa,
} from '../models/mesas-examenes.model'
import { environment } from '@/environments/environment.development'

@Injectable({
  providedIn: 'root',
})
export class MesasExamenesService {
  private http = inject(HttpClient)
  private apiUrl = `${environment.API_URL}/mesas_examenes`

  obtenerMesas(filtros?: FiltroMesaExamen): Observable<Mesa[]> {
    if (!filtros) return this.http.get<Mesa[]>(this.apiUrl)

    const filtrosParseados = Object.entries(filtros)
      .filter((filtro) => filtro[1])
      .map((filtro) => `${filtro[0]}=${filtro[1]}`)
      .join('&')

    return this.http.get<Mesa[]>(`${this.apiUrl}/?${filtrosParseados}`)
  }

  subirMesa(nuevaMesa: Mesa): Observable<any> {
    return this.http.post(this.apiUrl, nuevaMesa)
  }

  inscribirse(inscripcion: Inscripcion): Observable<any> {
    return this.http.post(`${this.apiUrl}/inscripcion`, inscripcion)
  }
}
