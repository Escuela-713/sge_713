import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { AuthService } from '../services/autenticacion.service'
import { map } from 'rxjs'

/** Deja pasar solo si hay sesión. Espera a que el backend confirme (evita el rebote al login al recargar). */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)

  return authService.checkAuthStatus().pipe(
    map((autenticado) => {
      if (autenticado) {
        return true
      }

      return router.createUrlTree(['/iniciar-sesion'], {
        queryParams: { returnUrl: state.url },
      })
    }),
  )
}
