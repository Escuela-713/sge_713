import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class NovedadesService {
  private apiUrl = 'http://127.0.0.1:8000/home/';
}