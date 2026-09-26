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

  constructor() {
    this.checkAuthStatus();
  }

  checkAuthStatus(): void {
    this.http
      .get<UserData>(`${this.API_URL}/me/`, {
        withCredentials: true,
      })
      .subscribe({
        next: (user) => {
          this.currentUser.set(user);
          this.isAuthenticated.set(true);
        },
        error: () => {
          this.currentUser.set(null);
          this.isAuthenticated.set(false);
        },
      });
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
