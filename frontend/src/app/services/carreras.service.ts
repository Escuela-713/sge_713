import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarrerasService {
  private apiUrl = "http://localhost:3000/carreras"

  constructor(private http: HttpClient) { }

  obtenerCarreras():Observable<any>
  {
    return this.http.get(this.apiUrl)
  }
}
