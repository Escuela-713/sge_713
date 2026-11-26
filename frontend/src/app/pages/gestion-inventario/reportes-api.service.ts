import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { Observable } from 'rxjs'
import { API_BASE } from './inventario-api.service'

export type FormatoReporte = 'pdf' | 'excel'

export interface FiltrosReporte {
  fechaDesde?: string
  fechaHasta?: string
  ubicacion?: number | null
  categoria?: number | null
}

@Injectable({ providedIn: 'root' })
export class ReportesApiService {
  private http = inject(HttpClient)

  /** GET /api/reportes/?formato=pdf|excel&fecha_desde=&fecha_hasta=&ubicacion=&categoria= */
  descargar(formato: FormatoReporte, filtros: FiltrosReporte): Observable<Blob> {
    let params = new HttpParams().set('formato', formato)
    if (filtros.fechaDesde) params = params.set('fecha_desde', filtros.fechaDesde)
    if (filtros.fechaHasta) params = params.set('fecha_hasta', filtros.fechaHasta)
    if (filtros.ubicacion) params = params.set('ubicacion', filtros.ubicacion)
    if (filtros.categoria) params = params.set('categoria', filtros.categoria)

    return this.http.get(`${API_BASE}/reportes/`, { params, responseType: 'blob' })
  }
}