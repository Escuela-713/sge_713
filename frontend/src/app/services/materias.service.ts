import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {
  private apiUrl = "http://localhost:3001/materias"

  constructor(private http:HttpClient) { }

  obtenerMaterias():Observable<any>
  {
    return this.http.get(this.apiUrl)
  }
}
