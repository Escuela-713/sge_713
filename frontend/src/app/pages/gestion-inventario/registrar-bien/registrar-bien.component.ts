import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ESTADOS_BIEN,
  InventarioApiService,
  Opcion,
  RUTA_INVENTARIO
} from '../inventario-api.service';

@Component({
  selector: 'app-registrar-bien',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './registrar-bien.component.html',
  styleUrl: './registrar-bien.component.css'
})
export class RegistrarBienComponent implements OnInit {

  @Input() id?: string;

  formulario!: FormGroup;
  enviando = false;
  mensaje = '';
  tipoMensaje: 'exito' | 'error' = 'exito';

  modoEdicion = false;
  cargandoBien = false;

  categorias: Opcion[] = [];
  ubicaciones: Opcion[] = [];
  estados: string[] = [...ESTADOS_BIEN];

  constructor(
    private fb: FormBuilder,
    private api: InventarioApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.modoEdicion = this.id !== undefined;
    this.inicializarFormulario();
    this.cargarOpciones();

    if (this.modoEdicion) {
      this.cargarBien();
    }
  }

  inicializarFormulario() {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      codigo_especial: [''],
      categoria: [null, [Validators.required]],
      ubicacion: [null, [Validators.required]],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      estado: [null, [Validators.required]],
      descripcion: ['']
    });
  }

  private cargarOpciones() {
    this.api.listarCategorias().subscribe({
      next: (lista) => (this.categorias = lista),
      error: (err) => {
        console.error('Error al cargar categorías:', err);
        this.mostrarMensaje('No se pudieron cargar las categorías.', 'error');
      }
    });

    this.api.listarUbicaciones().subscribe({
      next: (lista) => (this.ubicaciones = lista),
      error: (err) => {
        console.error('Error al cargar ubicaciones:', err);
        this.mostrarMensaje('No se pudieron cargar las ubicaciones.', 'error');
      }
    });
  }

  private cargarBien() {
    const idBien = Number(this.id);
    if (!Number.isInteger(idBien) || idBien <= 0) {
      this.mostrarMensaje('El identificador del bien no es válido.', 'error');
      return;
    }

    this.cargandoBien = true;
    this.api.obtenerBien(idBien).subscribe({
      next: (bien) => {
        if (bien.estado && !this.estados.includes(bien.estado)) {
          this.estados = [...this.estados, bien.estado];
        }
        this.formulario.patchValue({
          nombre: bien.nombre,
          codigo_especial: bien.codigo_especial ?? '',
          categoria: bien.categoria,
          ubicacion: bien.ubicacion,
          cantidad: bien.cantidad,
          estado: bien.estado,
          descripcion: bien.descripcion ?? ''
        });
        this.cargandoBien = false;
      },
      error: (err) => {
        console.error('Error al cargar el bien:', err);
        this.mostrarMensaje('No se pudo cargar el bien a editar.', 'error');
        this.cargandoBien = false;
      }
    });
  }

  onSubmit() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      this.mostrarMensaje('Por favor completa todos los campos requeridos', 'error');
      return;
    }

    this.enviando = true;
    const valores = this.formulario.value;
    const bien = {
      ...valores,
      codigo_especial: (valores.codigo_especial ?? '').trim() || undefined
    };

    const peticion = this.modoEdicion
      ? this.api.actualizarBien(Number(this.id), bien)
      : this.api.crearBien(bien);

    peticion.subscribe({
      next: () => {
        this.mostrarMensaje(
          this.modoEdicion ? '¡Bien actualizado exitosamente!' : '¡Bien registrado exitosamente!',
          'exito'
        );

        if (!this.modoEdicion) {
          this.formulario.reset({ cantidad: 1 });
        }

        setTimeout(() => {
          this.router.navigate([RUTA_INVENTARIO]);
        }, 2000);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al guardar el bien:', error);
        this.mostrarMensaje(this.mensajeDeError(error), 'error');
        this.enviando = false;
      },
      complete: () => {
        this.enviando = false;
      }
    });
  }

  onCancelar() {
    this.formulario.reset({ cantidad: 1 });
    this.router.navigate([RUTA_INVENTARIO]);
  }

  private mensajeDeError(error: HttpErrorResponse): string {
    const generico = this.modoEdicion
      ? 'Error al actualizar el bien. Intenta nuevamente.'
      : 'Error al registrar el bien. Intenta nuevamente.';

    if (error.status === 0) {
      return 'No se pudo conectar con el servidor. Verifica que el backend esté en marcha.';
    }

    const cuerpo = error.error;
    if (cuerpo && typeof cuerpo === 'object') {
      const detalle = cuerpo['detail'] ?? cuerpo['mensaje'] ?? cuerpo['error'];
      if (typeof detalle === 'string') {
        return detalle;
      }
    
      const primero = Object.entries(cuerpo)[0];
      if (primero) {
        const [campo, texto] = primero;
        return `${campo}: ${Array.isArray(texto) ? texto[0] : texto}`;
      }
    }
    return generico;
  }

  private mostrarMensaje(texto: string, tipo: 'exito' | 'error') {
    this.mensaje = texto;
    this.tipoMensaje = tipo;
  }

  get nombre() { return this.formulario.get('nombre'); }
  get categoria() { return this.formulario.get('categoria'); }
  get ubicacion() { return this.formulario.get('ubicacion'); }
  get cantidad() { return this.formulario.get('cantidad'); }
  get estado() { return this.formulario.get('estado'); }
}