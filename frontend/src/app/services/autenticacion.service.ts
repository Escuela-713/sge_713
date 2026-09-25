import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface RegisterRequest {
  email: string;
  contrasenia: string;
}

export interface LoginRequest {
  cuil: string; // Cambiado a cuil para coincidir con tu backend
  contrasenia: string;
}

export interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  // Corregido a la ruta exacta donde responde Django
  private readonly API_URL = 'http://127.0.0.1:8000/api/auth';
  private readonly TOKEN_KEY = 'auth_token';

  isAuthenticated = signal<boolean>(this.hasToken());

  /**
   * Registro de usuario
   */
  register(credentials: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/register/`, credentials).pipe(
      tap(response => this.saveToken(response.token))
    );
  }

  /**
   * Inicio de sesión
   */
  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login/`, credentials).pipe(
      tap(response => this.saveToken(response.token))
    );
  }

  /**
   * Cierre de sesión
   */
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.isAuthenticated.set(false);
  }

  /**
   * Obtener el token guardado
   */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    this.isAuthenticated.set(true);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }
}