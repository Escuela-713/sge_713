import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Bien {
  id_bien?: number;
  nombre: string | null;
  categoria: string | null;
  ubicacion: string | null;
  cantidad: number | null;
  estado: string | null;
  descripcion?: string | null;
  prestado?: number | null;
}

@Injectable({
  providedIn: 'root',
})
export class BienesService {
  private apiUrl = 'http://localhost:8000/api/v1/inventario/bienes';

  constructor(private http: HttpClient) {}

  obtenerBienes(): Observable<Bien[]> {
    return this.http.get<Bien[]>(`${this.apiUrl}/`);
  }

  obtenerBien(id: number): Observable<Bien> {
    return this.http.get<Bien>(`${this.apiUrl}/${id}/`);
  }

  crearBien(bien: Bien): Observable<Bien> {
    return this.http.post<Bien>(`${this.apiUrl}/crear/`, bien);
  }

  actualizarBien(id: number, bien: Bien): Observable<Bien> {
    return this.http.put<Bien>(`${this.apiUrl}/${id}/`, bien);
  }

  eliminarBien(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}/`);
  }
}