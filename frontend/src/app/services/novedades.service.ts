import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

export interface Publication {
  id : string
	title : string
	content : string
	image : string
	is_published : boolean 
	upload_date : string
	update_date : string
}

@Injectable({
  providedIn: 'root'
})
export class NovedadesService {
  private apiUrl = 'http://127.0.0.1:8000/home/';
  constructor(private http: HttpClient) {}

  postNovedad(newNovedad: any): Observable<any> {
    return this.http.post(this.apiUrl, newNovedad);
  } 
}