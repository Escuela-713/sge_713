import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';

export interface RegisterRequest {
  cuil: string;
  contrasenia: string;
}

export interface LoginRequest {
  cuil: string;
  contrasenia: string;
}

export interface UserData {
  id?: number;
  nombre?: string;
  rol?: string;
  cuil?: string;
}

export interface AuthResponse {
  mensaje?: string;
  usuario?: UserData;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private readonly API_URL = 'api/auth';

  isAuthenticated = signal<boolean>(false);
  currentUser = signal<UserData | null>(null);
  /** true si el usuario logueado tiene rol de administrador (ej. "Administrador"). */
  esAdmin = computed(() => (this.currentUser()?.rol ?? '').toLowerCase().startsWith('admin'));

  constructor() {
    this.checkAuthStatus();
  }

    checkAuthStatus(): void {
    this.verificarSesion().subscribe();
  }

  /**
   * Consulta al backend si hay sesión activa y actualiza las señales.
   * Lo usan los guards para esperar la respuesta (si no, al recargar la página
   * el guard ve isAuthenticated=false y manda al login antes de que /me/ conteste).
   */
  verificarSesion(): Observable<boolean> {
    return this.http
      .get<UserData>(`${this.API_URL}/me/`, { withCredentials: true })
      .pipe(
        tap((user) => {
          this.currentUser.set(user);
          this.isAuthenticated.set(true);
        }),
        map(() => true),
        catchError(() => {
          this.currentUser.set(null);
          this.isAuthenticated.set(false);
          return of(false);
        }),
      );
  }

  register(credentials: RegisterRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.API_URL}/register/`, credentials, {
        withCredentials: true,
      })
      .pipe(
        tap((response) => {
          if (response.usuario) {
            this.currentUser.set(response.usuario);
            this.isAuthenticated.set(true);
          }
        }),
      );
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.API_URL}/login/`, credentials, {
        withCredentials: true,
      })
      .pipe(
        tap((response) => {
          if (response.usuario) {
            this.currentUser.set(response.usuario);
            this.isAuthenticated.set(true);
          }
        }),
      );
  }

  logout(): void {
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
  }
}
