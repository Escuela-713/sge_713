import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  ObtenerAsistencias()
  {
    console.log("ola1")
    return this.http.get("./assets/dataAsistencias.json")
  }
}
