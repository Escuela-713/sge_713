import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarrerasService {

  constructor(private http: HttpClient) { }
  obtenerCarreras():Observable<any>
  {
  return this.http.get("./assets/carreras/carrera.json");
  }
}