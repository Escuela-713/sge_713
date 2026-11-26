import { HttpInterceptorFn, HttpClient } from '@angular/common/http';
import { Injector, inject } from '@angular/core';
import { BehaviorSubject, catchError, filter, finalize, switchMap, take, throwError } from 'rxjs';

import { AuthService, TokenService } from '../services/autenticacion.service';

const API_URL = 'api/v1/auth';
const API_HOSTS = ['http://127.0.0.1:8000', 'http://localhost:8000'];

let isRefreshing = false;

const refreshTokenSubject = new BehaviorSubject<string | null>(null);

// Solo las peticiones hacia nuestro backend llevan el token y las cookies.
const esPeticionAApi = (url: string): boolean =>
  url.startsWith('api/') ||
  url.startsWith('/api/') ||
  API_HOSTS.some((host) => url.startsWith(`${host}/api/`));

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (!esPeticionAApi(req.url)) {
    return next(req);
  }

  const tokenService = inject(TokenService);
  const http = inject(HttpClient);
  const injector = inject(Injector);
  const isLoginRequest = req.url.includes('/login/');
  const isRegisterRequest = req.url.includes('/registro/');
  const isRefreshRequest = req.url.includes('/token/refresh/');

  // Evitar renovar el token si falla el propio login o registro.
  if (isLoginRequest || isRegisterRequest || isRefreshRequest) {
    return next(req.clone({ withCredentials: true }));
  }

  const accessToken = tokenService.getAccessToken();

  // Agregar el Access Token si existe.
  const authReq = accessToken
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      })
    : req.clone({ withCredentials: true });

  return next(authReq).pipe(
    catchError((error) => {
      if (error.status !== 401) {
        return throwError(() => error);
      }

      // Si otra solicitud ya está renovando el token,
      // esperar a que termine.
      if (isRefreshing) {
        return refreshTokenSubject.pipe(
          filter((token) => token !== null),
          take(1),
          switchMap((token) => {
            if (!token) {
              return throwError(() => error);
            }

            const retryReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`,
              },
              withCredentials: true,
            });

            return next(retryReq);
          }),
        );
      }

      isRefreshing = true;
      refreshTokenSubject.next(null);

      // Pedir un Access Token nuevo utilizando la cookie.
      return http
        .post<{ access: string }>(
          `${API_URL}/token/refresh/`,
          {},
          { withCredentials: true },
        )
        .pipe(
          catchError((refreshError) => {
            tokenService.clearAccessToken();
            refreshTokenSubject.next('');
            // El refresh token venció o fue revocado: la sesión expiró.
            injector.get(AuthService).manejarSesionExpirada();
            return throwError(() => refreshError);
          }),

          switchMap((response) => {
            tokenService.setAccessToken(response.access);
            refreshTokenSubject.next(response.access);

            // Repetir la solicitud original con el nuevo token.
            const retryReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${response.access}`,
              },
              withCredentials: true,
            });

            return next(retryReq);
          }),

          finalize(() => {
            isRefreshing = false;
          }),
        );
    }),
  );
};