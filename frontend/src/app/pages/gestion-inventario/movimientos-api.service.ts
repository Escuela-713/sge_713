import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { Observable, map } from 'rxjs'
import { API_BASE } from './inventario-api.service'

export type TipoMovimiento = 'ingreso' | 'egreso'

/** Lo que se envía al backend (POST /api/movimientos/). */
export interface NuevoMovimiento {
  id_bien: number
  tipo: TipoMovimiento
  cantidad: number
  responsable: string
  telefono: string
  email?: string
  contacto?: string
  destino: string
}

/** Lo que se muestra en la tabla de movimientos. */
export interface Movimiento {
  id?: number
  fecha: string | null
  nombreBien: string
  tipo: string
  cantidad: number
  responsable: string
  telefono: string
  email: string
  estado: string
}

const texto = (valor: unknown): string => (valor === null || valor === undefined ? '' : String(valor))

/** Acepta nombres de campo distintos para no romperse si el backend cambia un nombre. */
function comoMovimiento(r: Record<string, unknown>): Movimiento {
  const bien = r['bien'] as Record<string, unknown> | string | undefined
  const nombreBien =
    r['nombre_bien'] ?? r['bien_nombre'] ?? (typeof bien === 'object' ? bien?.['nombre'] : bien) ?? ''
  return {
    id: r['id'] !== undefined ? Number(r['id']) : undefined,
    fecha: (r['fecha'] ?? r['fecha_movimiento'] ?? null) as string | null,
    nombreBien: texto(nombreBien),
    tipo: texto(r['tipo'] ?? r['tipo_movimiento']),
    cantidad: Number(r['cantidad'] ?? 0),
    responsable: texto(r['responsable']),
    telefono: texto(r['telefono']),
    email: texto(r['email'] ?? r['mail']),
    estado: texto(r['estado'])
  }
}

@Injectable({ providedIn: 'root' })
export class MovimientosApiService {
  private http = inject(HttpClient)

  listar(): Observable<Movimiento[]> {
    return this.http
      .get<Record<string, unknown>[] | { results: Record<string, unknown>[] }>(`${API_BASE}/movimientos/`)
      .pipe(
        map((r) => (Array.isArray(r) ? r : (r.results ?? []))),
        map((lista) => lista.map(comoMovimiento)),
        map((lista) =>
          [...lista].sort((a, b) => (b.fecha ?? '').localeCompare(a.fecha ?? ''))
        )
      )
  }

  registrar(movimiento: NuevoMovimiento): Observable<unknown> {
    return this.http.post(`${API_BASE}/movimientos/`, movimiento)
  }
}