import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatosPeronalesService {
  constructor(private http: HttpClient) {}

  obtenerdatosTutor(): Observable<any> {
    return this.http.get(
      'assets/datos-academicos/alumnos-ejemplo-bien-hecho.json'
    );
  }
  obtenerdatosFiltro(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/filtro/');
  }
  obtenerdatosAlumnos(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/alumnos-filtrado/');
  }
}
