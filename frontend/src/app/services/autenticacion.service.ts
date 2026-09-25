import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface RegisterRequest {
  email: string;
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
  token: string;
  usuario?: UserData; // Por si el backend también te devuelve los datos del usuario
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://127.0.0.1:8000/api/auth';
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'currentUser';

  isAuthenticated = signal<boolean>(this.hasToken());
  currentUser = signal<UserData | null>(this.getStoredUser());

  register(credentials: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/register/`, credentials).pipe(
      tap(response => this.saveSession(response.token, { cuil: credentials.email }))
    );
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login/`, credentials).pipe(
      tap(response => {
        // Podés armar el objeto con lo que devuelva el backend o usar el cuil
        const user: UserData = response.usuario || { cuil: credentials.cuil, nombre: 'Usuario', rol: 'Admin' };
        this.saveSession(response.token, user);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.isAuthenticated.set(false);
    this.currentUser.set(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private saveSession(token: string, user: UserData): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    
    this.isAuthenticated.set(true);
    this.currentUser.set(user);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  private getStoredUser(): UserData | null {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }
}