import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  constructor(private http:HttpClient) { }

  obtenerMaterias():Observable<any>
  {
    return this.http.get("assets/materias.json")
  }
}
