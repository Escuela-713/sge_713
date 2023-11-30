import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanesService {

  constructor(private http:HttpClient) { }
  obtenerPlanes():Observable<any>
  {
    return this.http.get("./assets/planes/planes.json")
  }
}
