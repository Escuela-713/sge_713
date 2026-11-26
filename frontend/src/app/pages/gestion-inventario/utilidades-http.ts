import { HttpErrorResponse } from '@angular/common/http'

export function mensajeDeErrorHttp(error: HttpErrorResponse, generico: string): string {
  if (error.status === 0) {
    return 'No se pudo conectar con el servidor. Verificá que el backend esté en marcha.'
  }
  if (error.status === 401 || error.status === 403) {
    return 'No tenés permiso para realizar esta acción. Iniciá sesión nuevamente.'
  }

  const cuerpo = error.error
  if (cuerpo && typeof cuerpo === 'object') {
    const detalle = cuerpo['detail'] ?? cuerpo['mensaje'] ?? cuerpo['error']
    if (typeof detalle === 'string') {
      return detalle
    }
    const primero = Object.entries(cuerpo)[0]
    if (primero) {
      const [campo, texto] = primero
      return `${campo}: ${Array.isArray(texto) ? texto[0] : texto}`
    }
  }
  return generico
}