import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CooperadoraMovimientosService {
  url: string = 'http://localhost:8000/api/v1/cooperadora/movimientos/';

  constructor(private http: HttpClient) {}

  getMovimientos(): Observable<any> {
    return this.http.get(this.url);
  }

  crearMovimiento(movimiento: any): Observable<any> {
    return this.http.post(this.url, movimiento);
  }

  actualizarMovimiento(id: string, movimiento: any): Observable<any> {
    return this.http.put(`${this.url}${id}/`, movimiento);
  }

  eliminarMovimiento(id: string): Observable<any> {
    return this.http.delete(`${this.url}${id}/`);
  }
}