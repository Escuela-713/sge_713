import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosPeronalesService {

  constructor(private http: HttpClient) { }

  obtenerdatosTutor():Observable<any> {
    return this.http.get("./assets/datos-personales/datostutor.json");
  }
}
