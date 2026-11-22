import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../services/autenticacion.service';

/** Deja pasar solo si hay sesión. Espera a que el backend confirme (evita el rebote al login al recargar). */
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  return authService
    .verificarSesion()
    .pipe(map((ok) => (ok ? true : router.createUrlTree(['/iniciar-sesion']))));
};

/** Deja pasar solo a administradores; el resto vuelve al inventario. */
export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const decidir = (ok: boolean) => {
    if (!ok) return router.createUrlTree(['/iniciar-sesion']);
    return authService.esAdmin() ? true : router.createUrlTree(['/dashboard/inventario']);
  };

  if (authService.isAuthenticated()) {
    return decidir(true);
  }
  return authService.verificarSesion().pipe(map(decidir));
};