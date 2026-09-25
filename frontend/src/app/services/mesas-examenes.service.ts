import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { Observable } from 'rxjs'
import { FiltroMesaExamen, Mesa } from '../models/mesas-examenes.model'
import { environment } from '@/environments/environment.development'

@Injectable({
  providedIn: 'root',
})
export class MesasExamenesService {
  private http = inject(HttpClient)
  private apiUrl = environment.API_URL

  obtenerMesas(filtros?: FiltroMesaExamen): Observable<Mesa[]> {
    if (!filtros) return this.http.get<Mesa[]>(`${this.apiUrl}/mesas_examenes`)

    const filtrosParseados = Object.entries(filtros)
      .filter((filtro) => filtro[1])
      .map((filtro) => `${filtro[0]}=${filtro[1]}`)
      .join('&')

    return this.http.get<Mesa[]>(
      `${this.apiUrl}/mesas_examenes/?${filtrosParseados}`,
    )
  }

  subirMesa(nuevaMesa: Mesa) {
    return this.http.post(`${this.apiUrl}/mesas_examenes`, nuevaMesa)
  }
}
