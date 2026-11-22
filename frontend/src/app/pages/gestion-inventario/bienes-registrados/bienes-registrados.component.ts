import { Component, OnInit, computed, inject, signal } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterLink } from '@angular/router'
import { forkJoin, of } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { AuthService } from '@/app/services/autenticacion.service'
import { BienInventario, InventarioApiService, Opcion } from '../inventario-api.service'

@Component({
  selector: 'app-bienes-registrados',
  imports: [RouterLink, FormsModule],
  templateUrl: './bienes-registrados.component.html',
  styleUrls: ['./bienes-registrados.component.css']
})
export class BienesRegistradosComponent implements OnInit {
  private api = inject(InventarioApiService)
  private auth = inject(AuthService)

  esAdmin = this.auth.esAdmin

  bienes = signal<BienInventario[]>([])
  categorias = signal<Opcion[]>([])
  ubicaciones = signal<Opcion[]>([])
  busqueda = signal('')
  cargando = signal(true)
  error = signal('')
  mensajeError = signal('')

  /** Filtra por nombre, código, categoría, ubicación y estado. Tolerante a campos vacíos. */
  bienesFiltrados = computed(() => {
    const termino = this.busqueda().trim().toLowerCase()
    if (!termino) {
      return this.bienes()
    }
    return this.bienes().filter((bien) =>
      [bien.nombre, bien.codigo_especial, this.categoriaDe(bien), this.ubicacionDe(bien), bien.estado].some(
        (campo) => (campo ?? '').toLowerCase().includes(termino)
      )
    )
  })

  ngOnInit() {
    this.cargar()
  }

  cargar() {
    this.cargando.set(true)
    this.error.set('')

    forkJoin({
      bienes: this.api.listarBienes(),
      categorias: this.api.listarCategorias().pipe(catchError(() => of<Opcion[]>([]))),
      ubicaciones: this.api.listarUbicaciones().pipe(catchError(() => of<Opcion[]>([])))
    }).subscribe({
      next: ({ bienes, categorias, ubicaciones }) => {
        this.bienes.set(bienes)
        this.categorias.set(categorias)
        this.ubicaciones.set(ubicaciones)
        this.cargando.set(false)
      },
      error: (err) => {
        console.error('Error al cargar los bienes:', err)
        this.error.set('Error al cargar los bienes. Intentá nuevamente.')
        this.cargando.set(false)
      }
    })
  }

  categoriaDe(bien: BienInventario): string {
    return this.etiqueta(bien.categoria, this.categorias())
  }

  ubicacionDe(bien: BienInventario): string {
    return this.etiqueta(bien.ubicacion, this.ubicaciones())
  }

  prestadoDe(bien: BienInventario): string {
    if (bien.prestado === undefined || bien.prestado === null) {
      return 'N/D'
    }
    return bien.prestado ? 'Sí' : 'No'
  }

  private etiqueta(valor: number | string | null | undefined, lista: Opcion[]): string {
    if (valor === null || valor === undefined || valor === '') {
      return 'N/D'
    }
    const opcion = lista.find((o) => String(o.id) === String(valor))
    return opcion ? opcion.nombre : String(valor)
  }

  eliminarBien(bien: BienInventario) {
    if (bien.id_bien === undefined) {
      return
    }
    if (!confirm(`¿Seguro que querés eliminar "${bien.nombre}"? Esta acción no se puede deshacer.`)) {
      return
    }

    this.mensajeError.set('')
    this.api.eliminarBien(bien.id_bien).subscribe({
      next: () => this.bienes.update((lista) => lista.filter((b) => b.id_bien !== bien.id_bien)),
      error: (err) => {
        console.error('Error al eliminar el bien:', err)
        this.mensajeError.set('No se pudo eliminar el bien. Intentá nuevamente.')
      }
    })
  }
}