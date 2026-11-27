import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { Observable, map } from 'rxjs'

export const API_BASE = 'http://localhost:8000/api/v1/inventario'

export const RUTA_INVENTARIO = '/dashboard/inventario'

export const ESTADOS_BIEN: readonly string[] = ['Bueno', 'Regular', 'Necesita reparación']


export interface Opcion {
  id: number
  nombre: string
}

export interface BienInventario {
  id_bien?: number
  nombre: string
 
  codigo_especial?: string | null
 
  categoria: number | string | null
  
  ubicacion: number | string | null
  cantidad: number
  estado: string
  descripcion?: string | null
  fecha_adquisicion?: string | null
  prestado?: boolean
}


function comoLista<T>(respuesta: T[] | { results: T[] }): T[] {
  return Array.isArray(respuesta) ? respuesta : (respuesta.results ?? [])
}

function comoOpcion(registro: Record<string, unknown>, claveId: string): Opcion {
  const id = registro['id'] ?? registro[claveId]
  const nombre = registro['nombre'] ?? registro['title'] ?? registro['descripcion']
  return { id: Number(id), nombre: String(nombre ?? '') }
}

@Injectable({ providedIn: 'root' })
export class InventarioApiService {
  private http = inject(HttpClient)


  listarBienes(): Observable<BienInventario[]> {
    return this.http
      .get<BienInventario[] | { results: BienInventario[] }>(`${API_BASE}/bienes/`)
      .pipe(map(comoLista))
  }

  obtenerBien(id: number): Observable<BienInventario> {
    return this.http.get<BienInventario>(`${API_BASE}/bienes/${id}/`)
  }

  crearBien(bien: Partial<BienInventario>): Observable<BienInventario> {
    return this.http.post<BienInventario>(`${API_BASE}/bienes/`, bien)
  }

  
  actualizarBien(id: number, cambios: Partial<BienInventario>): Observable<BienInventario> {
    return this.http.patch<BienInventario>(`${API_BASE}/bienes/${id}/`, cambios)
  }

  eliminarBien(id: number): Observable<void> {
    return this.http.delete<void>(`${API_BASE}/bienes/${id}/`)
  }

  listarCategorias(): Observable<Opcion[]> {
    return this.http
      .get<Record<string, unknown>[] | { results: Record<string, unknown>[] }>(`${API_BASE}/categorias/`)
      .pipe(map((r) => comoLista(r).map((c) => comoOpcion(c, 'id_categoria'))))
  }

  listarUbicaciones(): Observable<Opcion[]> {
    return this.http
      .get<Record<string, unknown>[] | { results: Record<string, unknown>[] }>(`${API_BASE}/ubicaciones/`)
      .pipe(map((r) => comoLista(r).map((u) => comoOpcion(u, 'id_ubicacion'))))
  }
}