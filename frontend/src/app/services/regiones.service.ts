
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

export interface UbicacionLocalidad {
  pais: Pais;
  provincia: Provincia;
  localidad: Localidad;
}

interface RegionesData {
  paises: Pais[];
  provincias: Provincia[];
  localidades: Localidad[];
}

@Injectable({
  providedIn: 'root',
})
export class RegionService {
  private apiUrl = 'assets/datos-personales/regiones.json';

  constructor(private http: HttpClient) {}

  private getRegiones(): Observable<RegionesData> {
    return this.http.get<RegionesData>(this.apiUrl);
  }

  getPaises(): Observable<Pais[]> {
    return this.getRegiones().pipe(
      map((data) => data.paises)
    );
  }

  getProvinciasByPais(paisId: number): Observable<Provincia[]> {
    return this.getRegiones().pipe(
      map((data) =>
        data.provincias.filter((provincia) => provincia.paisId === paisId)
      )
    );
  }

  getLocalidadesByProvincia(
    provinciaId: number
  ): Observable<Localidad[]> {
    return this.getRegiones().pipe(
      map((data) =>
        data.localidades.filter(
          (localidad) => localidad.provinciaId === provinciaId
        )
      )
    );
  }

  getUbicacionPorLocalidad(
    localidadId: number
  ): Observable<UbicacionLocalidad | null> {
    return this.getRegiones().pipe(
      map((data) => {
        const localidad = data.localidades.find(
          (item) => item.id === localidadId
        );

        if (!localidad) {
          return null;
        }

        const provincia = data.provincias.find(
          (item) => item.id === localidad.provinciaId
        );

        if (!provincia) {
          return null;
        }

        const pais = data.paises.find(
          (item) => item.id === provincia.paisId
        );

        if (!pais) {
          return null;
        }

        return {
          pais,
          provincia,
          localidad,
        };
      })
    );
  }
}
