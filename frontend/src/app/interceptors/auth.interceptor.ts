
import { HttpInterceptorFn, HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { BehaviorSubject, catchError, filter, finalize, switchMap, take, throwError } from 'rxjs';

import { TokenService } from '../services/autenticacion.service';

const API_URL = 'api/v1/auth';

let isRefreshing = false;

const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const http = inject(HttpClient);

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
