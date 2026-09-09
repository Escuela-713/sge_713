import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class CooperadoraMovimientosService {
  url: string = 'http://localhost:3000/movimientos';

  constructor(private http: HttpClient) { }

  getMovimientos(): Observable<any>
   {
    return this.http.get(this.url);
  }
  
}
