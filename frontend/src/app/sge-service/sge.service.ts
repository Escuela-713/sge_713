import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SgeService {

  constructor(private http: HttpClient) { }

  obtenerdatosTutor():Observable<any> {
    return this.http.get("./assets/jsondatospersonales/datostutor.json");
  }
}
