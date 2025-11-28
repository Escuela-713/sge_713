import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Bien {
  id_bien?: number;
  nombre: string;
  codigo: string;
  ubicacion: string;
  cantidad: number;
  estado: string;
  descripcion?: string;
  fecha_creacion?: string;
  fecha_actualizacion?: string;
}

export interface Ingreso {
  id_ingreso?: number;
  id_bien: number;
  cantidad: number;
  motivo: string;
  fecha?: string;
  observacion?: string;
}

export interface Egreso {
  id_egreso?: number;
  id_bien: number;
  cantidad: number;
  motivo: string;
  fecha?: string;
  observacion?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BienesService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  // ===== BIENES =====
  obtenerBienes(): Observable<Bien[]> {
    return this.http.get<Bien[]>(`${this.apiUrl}/bienes/`);
  }

  obtenerBien(id: number): Observable<Bien> {
    return this.http.get<Bien>(`${this.apiUrl}/bienes/${id}/`);
  }

  crearBien(bien: Bien): Observable<Bien> {
    return this.http.post<Bien>(`${this.apiUrl}/bienes/`, bien);
  }

  actualizarBien(id: number, bien: Bien): Observable<Bien> {
    return this.http.put<Bien>(`${this.apiUrl}/bienes/${id}/`, bien);
  }

  eliminarBien(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/bienes/${id}/`);
  }

  // ===== MOVIMIENTOS =====
  obtenerMovimientosBien(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/bienes/${id}/movimientos/`);
  }

  // ===== INGRESOS =====
  obtenerIngresos(): Observable<Ingreso[]> {
    return this.http.get<Ingreso[]>(`${this.apiUrl}/ingresos/`);
  }

  crearIngreso(ingreso: Ingreso): Observable<Ingreso> {
    return this.http.post<Ingreso>(`${this.apiUrl}/ingresos/`, ingreso);
  }

  // ===== EGRESOS =====
  obtenerEgresos(): Observable<Egreso[]> {
    return this.http.get<Egreso[]>(`${this.apiUrl}/egresos/`);
  }

  crearEgreso(egreso: Egreso): Observable<Egreso> {
    return this.http.post<Egreso>(`${this.apiUrl}/egresos/`, egreso);
  }
}
