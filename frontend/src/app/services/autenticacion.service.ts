import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface RegisterRequest {
  cuil: string;
  contrasenia: string;
}

export interface LoginRequest {
  cuil: string;
  contrasenia: string;
}

export interface UserData {
  nombre?: string;
  rol?: string;
  cuil?: string;
}

export interface AuthResponse {
  mensaje?: string;
  usuario?: UserData;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://127.0.0.1:8000/api/auth';
  private readonly USER_KEY = 'currentUser';

  isAuthenticated = signal<boolean>(!!this.getStoredUser());
  currentUser = signal<UserData | null>(this.getStoredUser());

  register(credentials: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/register/`, credentials, {
      withCredentials: true // Necesario para enviar/recibir cookies entre dominios/puertos
    }).pipe(
      tap(response => {
        const user: UserData = response.usuario || { cuil: credentials.cuil };
        this.saveUserSession(user);
      })
    );
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login/`, credentials, {
      withCredentials: true // Fundamental para que el navegador acepte la cookie Set-Cookie del backend
    }).pipe(
      tap(response => {
        const user: UserData = response.usuario || { cuil: credentials.cuil, nombre: 'Usuario', rol: 'Admin' };
        this.saveUserSession(user);
      })
    );
  }

  logout(): void {
    sessionStorage.removeItem(this.USER_KEY);
    this.isAuthenticated.set(false);
    this.currentUser.set(null);
  }

  private saveUserSession(user: UserData): void {
    sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
    
    this.isAuthenticated.set(true);
    this.currentUser.set(user);
  }

  private getStoredUser(): UserData | null {
    const user = sessionStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }
}