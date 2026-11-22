import { HttpErrorResponse } from '@angular/common/http'
import { Component, OnInit, inject, signal } from '@angular/core'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { InventarioApiService, Opcion } from '../inventario-api.service'
import { FormatoReporte, ReportesApiService } from '../reportes-api.service'
import { mensajeDeErrorHttp } from '../utilidades-http'

@Component({
  selector: 'app-reportes-inventario',
  imports: [ReactiveFormsModule],
  templateUrl: './reportes-inventario.component.html',
  styleUrls: ['./reportes-inventario.component.css']
})
export class ReportesInventarioComponent implements OnInit {
  private fb = inject(FormBuilder)
  private inventarioApi = inject(InventarioApiService)
  private reportesApi = inject(ReportesApiService)

  categorias = signal<Opcion[]>([])
  ubicaciones = signal<Opcion[]>([])
  descargando = signal<FormatoReporte | null>(null)
  mensaje = signal<{ texto: string; tipo: 'exito' | 'error' } | null>(null)

  filtros = this.fb.group({
    fechaDesde: [''],
    fechaHasta: [''],
    ubicacion: [null as number | null],
    categoria: [null as number | null]
  })

  ngOnInit() {
    this.inventarioApi.listarCategorias().subscribe({
      next: (l) => this.categorias.set(l),
      error: () => this.mensaje.set({ texto: 'No se pudieron cargar las categorías.', tipo: 'error' })
    })
    this.inventarioApi.listarUbicaciones().subscribe({
      next: (l) => this.ubicaciones.set(l),
      error: () => this.mensaje.set({ texto: 'No se pudieron cargar las ubicaciones.', tipo: 'error' })
    })
  }

  limpiar() {
    this.filtros.reset({ fechaDesde: '', fechaHasta: '', ubicacion: null, categoria: null })
    this.mensaje.set(null)
  }

  descargar(formato: FormatoReporte) {
    this.mensaje.set(null)
    const f = this.filtros.getRawValue()

    if (f.fechaDesde && f.fechaHasta && f.fechaDesde > f.fechaHasta) {
      this.mensaje.set({ texto: 'La fecha «desde» no puede ser posterior a la fecha «hasta».', tipo: 'error' })
      return
    }

    this.descargando.set(formato)
    this.reportesApi
      .descargar(formato, {
        fechaDesde: f.fechaDesde || undefined,
        fechaHasta: f.fechaHasta || undefined,
        ubicacion: f.ubicacion,
        categoria: f.categoria
      })
      .subscribe({
        next: (blob) => {
          this.guardarArchivo(blob, formato)
          this.mensaje.set({ texto: 'Reporte generado correctamente.', tipo: 'exito' })
          this.descargando.set(null)
        },
        error: async (err: HttpErrorResponse) => {
          console.error('Error al generar el reporte:', err)
          // con responseType 'blob' el cuerpo del error también llega como Blob
          if (err.error instanceof Blob) {
            try {
              const texto = await err.error.text()
              err = new HttpErrorResponse({ status: err.status, error: JSON.parse(texto) })
            } catch {
              /* el cuerpo no era JSON: se usa el mensaje genérico */
            }
          }
          this.mensaje.set({
            texto: mensajeDeErrorHttp(err, 'No se pudo generar el reporte. Intentá nuevamente.'),
            tipo: 'error'
          })
          this.descargando.set(null)
        }
      })
  }

  private guardarArchivo(blob: Blob, formato: FormatoReporte) {
    const extension = formato === 'pdf' ? 'pdf' : 'xlsx'
    const url = URL.createObjectURL(blob)
    const enlace = document.createElement('a')
    enlace.href = url
    enlace.download = `reporte-inventario.${extension}`
    enlace.click()
    URL.revokeObjectURL(url)
  }
}