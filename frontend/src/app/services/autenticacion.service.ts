import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  Observable,
  tap,
  map,
  switchMap,
  catchError,
  of,
  shareReplay,
} from 'rxjs';

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

export interface PersonaData {
  primer_nombre: string;
  segundo_nombre: string | null;
  tercer_nombre: string | null;
  primer_apellido: string;
  segundo_apellido: string | null;
  fecha_nacimiento: string;
  email: string;
  telefono: string;
  genero: string;
  tipo_sangre: string | null;
  calle: string;
  numero_calle: number;
  barrio: string;
  id_localidad: number;
  id_localidad_nacimiento: number;
}
export interface UserData {
  id_usuario: number;
  nombre: string;
  dni: string;
  rol: string;
  roles: string[];
  is_superuser: boolean;
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

  private router = inject(Router);
  private readonly API_URL = 'api/v1/auth';

  isAuthenticated = signal<boolean>(false);
  currentUser = signal<UserData | null>(null);
  /** true si el usuario logueado tiene rol de administrador (ej. "Administrador"). */
  esAdmin = computed(() => {
    const usuario = this.currentUser();

    return usuario?.is_superuser === true ||
      usuario?.roles?.includes('administradores') === true;
  });

  private authCheck$?: Observable<boolean>;

  constructor() {
    this.checkAuthStatus().subscribe();
  }

  checkAuthStatus(): Observable<boolean> {
    if (!this.authCheck$) {
      this.authCheck$ = this.http
        .post<{ access: string }>(
          `${this.API_URL}/token/refresh/`,
          {},
          { withCredentials: true },
        )
        .pipe(
          switchMap((response) => {
            this.tokenService.setAccessToken(response.access);

            return this.http
              .get<UserData>(`${this.API_URL}/me/`, {
                withCredentials: true,
              })
              .pipe(
                tap((user) => {
                  this.currentUser.set(user);
                  this.isAuthenticated.set(true);
                }),
                map(() => true),
              );
          }),
          catchError(() => {
            this.tokenService.clearAccessToken();
            this.currentUser.set(null);
            this.isAuthenticated.set(false);
            this.authCheck$ = undefined;

            return of(false);
          }),
          shareReplay(1),
        );
    }

    return this.authCheck$;
  }

  register(credentials: RegisterRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.API_URL}/registro/`, credentials, {
        withCredentials: true,
      })
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

          this.authCheck$ = of(true);
        }),
      );
  }

  obtenerDatosPersonales(): Observable<PersonaData> {
    return this.http.get<PersonaData>(
      `${this.API_URL}/me/update/`,
      { withCredentials: true },
    );
  }

  modificarDatosPersonales(
    datos: Partial<PersonaData>,
  ): Observable<any> {
    return this.http.patch(
      `${this.API_URL}/me/update/`,
      datos,
      { withCredentials: true },
    );
  }
  manejarSesionExpirada(): void {
    if (!this.isAuthenticated()) return;

    const returnUrl = this.router.url;
    this.limpiarSesion();
    this.router.navigate(['/iniciar-sesion'], {
      queryParams: { expirada: true, returnUrl },
    });
  }
  logout(): void {
  this.http
    .post(
      `${this.API_URL}/logout/`,
      {},
      { withCredentials: true },
    )
    .subscribe({
      next: () => {
        this.limpiarSesion();
      },
      error: () => {
        // Aunque falle la petición, limpiamos la sesión local.
        this.limpiarSesion();
      },
    });
}

private limpiarSesion(): void {
  this.tokenService.clearAccessToken();
  this.currentUser.set(null);
  this.isAuthenticated.set(false);
  this.authCheck$ = of(false);
}
}

