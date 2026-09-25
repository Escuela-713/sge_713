import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Pais {
  id: number;
  nombre: string;
}
export interface Provincia {
  id: number;
  paisId: number;
  nombre: string;
}
export interface Localidad {
  id: number;
  provinciaId: number;
  nombre: string;
}

@Injectable({
  providedIn: 'root',
})
export class RegionService {
  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  getPaises(): Observable<Pais[]> {
    return this.http.get<Pais[]>(`${this.apiUrl}/paises`);
  }

  getProvinciasByPais(paisId: number): Observable<Provincia[]> {
    return this.http.get<Provincia[]>(
      `${this.apiUrl}/provincias?paisId=${paisId}`,
    );
  }

  getLocalidadesByProvincia(provinciaId: number): Observable<Localidad[]> {
    return this.http.get<Localidad[]>(
      `${this.apiUrl}/localidades?provinciaId=${provinciaId}`,
    );
  }
}
