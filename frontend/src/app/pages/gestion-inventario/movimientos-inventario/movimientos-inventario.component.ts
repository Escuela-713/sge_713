import { HttpErrorResponse } from '@angular/common/http'
import { Component, OnInit, inject, signal } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { BienInventario, InventarioApiService } from '../inventario-api.service'
import { Movimiento, MovimientosApiService, TipoMovimiento } from '../movimientos-api.service'
import { mensajeDeErrorHttp } from '../utilidades-http'

@Component({
  selector: 'app-movimientos-inventario',
  imports: [ReactiveFormsModule],
  templateUrl: './movimientos-inventario.component.html',
  styleUrls: ['./movimientos-inventario.component.css']
})
export class MovimientosInventarioComponent implements OnInit {
  private fb = inject(FormBuilder)
  private bienesApi = inject(InventarioApiService)
  private movimientosApi = inject(MovimientosApiService)

  bienes = signal<BienInventario[]>([])
  movimientos = signal<Movimiento[]>([])
  cargando = signal(true)
  errorCarga = signal('')
  enviando = signal(false)
  mensaje = signal<{ texto: string; tipo: 'exito' | 'error' } | null>(null)

  formulario = this.fb.group({
    tipo: ['ingreso' as TipoMovimiento, [Validators.required]],
    id_bien: [null as number | null, [Validators.required]],
    cantidad: [1, [Validators.required, Validators.min(1)]],
    responsable: ['', [Validators.required]],
    telefono: ['', [Validators.required, Validators.pattern(/^[0-9+()\s-]{6,20}$/)]],
    email: ['', [Validators.email]],
    contacto: [''],
    destino: ['', [Validators.required]]
  })

  ngOnInit() {
    this.cargar()
  }

  cargar() {
    this.cargando.set(true)
    this.errorCarga.set('')

    this.bienesApi.listarBienes().subscribe({
      next: (lista) => this.bienes.set(lista),
      error: (err) => {
        console.error('Error al cargar los bienes:', err)
        this.errorCarga.set('No se pudieron cargar los bienes.')
      }
    })

    this.movimientosApi.listar().subscribe({
      next: (lista) => {
        this.movimientos.set(lista)
        this.cargando.set(false)
      },
      error: (err) => {
        console.error('Error al cargar los movimientos:', err)
        this.errorCarga.set('No se pudieron cargar los movimientos. Intentá nuevamente.')
        this.cargando.set(false)
      }
    })
  }

  /** Marca un campo como inválido solo después de que el usuario lo toca o intenta enviar. */
  invalido(campo: string): boolean {
    const control = this.formulario.get(campo)
    return !!control && control.invalid && (control.touched || control.dirty)
  }

  errorDe(campo: string): string {
    const control = this.formulario.get(campo)
    if (!control?.errors) {
      return ''
    }
    if (control.errors['required']) {
      return 'Falta dato obligatorio'
    }
    if (control.errors['min']) {
      return 'La cantidad mínima es 1'
    }
    if (control.errors['pattern']) {
      return 'Ingresá un teléfono válido (solo números, +, - y paréntesis)'
    }
    if (control.errors['email']) {
      return 'Ingresá un mail válido'
    }
    return 'Dato inválido'
  }

  enviar() {
    this.mensaje.set(null)

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched()
      this.mensaje.set({ texto: 'Falta dato obligatorio', tipo: 'error' })
      return
    }

    const v = this.formulario.getRawValue()
    const idBien = Number(v.id_bien)
    const bien = this.bienes().find((b) => b.id_bien === idBien)

    if (v.tipo === 'egreso' && bien && (v.cantidad ?? 0) > bien.cantidad) {
      this.mensaje.set({
        texto: `No hay stock suficiente: quedan ${bien.cantidad} unidad(es) de «${bien.nombre}».`,
        tipo: 'error'
      })
      return
    }

    this.enviando.set(true)
    this.movimientosApi
      .registrar({
        id_bien: idBien,
        tipo: v.tipo ?? 'ingreso',
        cantidad: Number(v.cantidad),
        responsable: (v.responsable ?? '').trim(),
        telefono: (v.telefono ?? '').trim(),
        email: (v.email ?? '').trim() || undefined,
        contacto: (v.contacto ?? '').trim() || undefined,
        destino: (v.destino ?? '').trim()
      })
      .subscribe({
        next: () => {
          this.mensaje.set({
            texto: v.tipo === 'ingreso' ? 'Ingreso registrado correctamente.' : 'Egreso registrado correctamente.',
            tipo: 'exito'
          })
          this.enviando.set(false)
          this.limpiar()
          this.cargar()
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error al registrar el movimiento:', err)
          this.mensaje.set({
            texto: mensajeDeErrorHttp(err, 'No se pudo registrar el movimiento. Intentá nuevamente.'),
            tipo: 'error'
          })
          this.enviando.set(false)
        }
      })
  }

  cancelar() {
    this.limpiar()
    this.mensaje.set(null)
  }

  private limpiar() {
    this.formulario.reset({ tipo: 'ingreso', id_bien: null, cantidad: 1 })
  }
}