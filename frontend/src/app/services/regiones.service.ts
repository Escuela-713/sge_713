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
  private jsonUrl = 'assets/datos-personales/regiones.json';

  constructor(private http: HttpClient) {}

  getPaises(): Observable<Pais[]> {
    return this.http.get<any>(this.jsonUrl).pipe(map((data) => data.paises));
  }

  getProvinciasByPais(paisId: number): Observable<Provincia[]> {
    return this.http
      .get<any>(this.jsonUrl)
      .pipe(
        map((data) =>
          data.provincias.filter((p: Provincia) => p.paisId === paisId),
        ),
      );
  }

  getLocalidadesByProvincia(provinciaId: number): Observable<Localidad[]> {
    return this.http
      .get<any>(this.jsonUrl)
      .pipe(
        map((data) =>
          data.localidades.filter(
            (l: Localidad) => l.provinciaId === provinciaId,
          ),
        ),
      );
  }
}
