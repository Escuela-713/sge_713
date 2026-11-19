
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface RegisterRequest {
  dni: string;
  primer_nombre: string;
  segundo_nombre?: string;
  tercer_nombre?: string;
  primer_apellido: string;
  segundo_apellido?: string;
  fecha_nacimiento: string;
  email: string;
  telefono: string;
  genero?: string;
  tipo_sangre?: string | null;
  calle: string;
  numero_calle: number;
  barrio: string;
  id_localidad: number;
  id_localidad_nacimiento: number;
  contrasenia: string;
}

export interface LoginRequest {
  dni: string;
  contrasenia: string;
}

export interface UserData {
  id_usuario: number;
  nombre: string;
  dni: string;
  rol: string;
  roles: string[];
}

export interface AuthResponse {
  mensaje: string;
  usuario: UserData;
  tokens?: {
    access: string;
  };
}

// Administrador del Access Token
@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private accessToken: string | null = null;

  getAccessToken(): string | null {
    return this.accessToken;
  }

  setAccessToken(token: string): void {
    this.accessToken = token;
  }

  clearAccessToken(): void {
    this.accessToken = null;
  }
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private tokenService = inject(TokenService);

  private readonly API_URL = 'api/v1/auth';

  isAuthenticated = signal<boolean>(false);
  currentUser = signal<UserData | null>(null);

  constructor() {
    this.checkAuthStatus();
  }

  
checkAuthStatus(): void {
  this.http
    .post<{ access: string }>(
      `${this.API_URL}/token/refresh/`,
      {},
      { withCredentials: true },
    )
    .subscribe({
      next: (response) => {
        this.tokenService.setAccessToken(response.access);

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
              this.tokenService.clearAccessToken();
              this.currentUser.set(null);
              this.isAuthenticated.set(false);
            },
          });
      },
      error: () => {
        this.tokenService.clearAccessToken();
        this.currentUser.set(null);
        this.isAuthenticated.set(false);
      },
    });
}


  register(credentials: RegisterRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.API_URL}/registro/`, credentials, {
        withCredentials: true,
      })
      .pipe(
        tap((response) => {
          if (response.usuario) {
            this.currentUser.set(response.usuario);
            this.isAuthenticated.set(true);
          }

          if (response.tokens?.access) {
            this.tokenService.setAccessToken(response.tokens.access);
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

          if (response.tokens?.access) {
            this.tokenService.setAccessToken(response.tokens.access);
          }
        }),
      );
  }

  logout(): void {
    this.tokenService.clearAccessToken();
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
  }
}
