import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  ObtenerAsistencias():Observable<any>
  {
    console.log("ola1")
    return this.http.get("./assets/dataAsistencias.json")
  }
}
