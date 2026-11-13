import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Slide } from '../editar-evento.models';

export interface GuardarSlidePayload {
  id: number | null;
  formData: FormData;
}

export interface OpcionImagen {
  ruta: string;
  nombre: string;
}

export const IMAGENES_PREDETERMINADAS: OpcionImagen[] = [
  { ruta: '/assets/imgs/dona-sangre.avif', nombre: 'Dona sangre' },
  { ruta: '/assets/imgs/sumate-campana.jpg', nombre: 'Súmate a la campaña' },
  { ruta: '/assets/imgs/cada-gota-cuenta.jpg', nombre: 'Cada gota cuenta' },
  { ruta: '/assets/imgs/orientaciones.jpg', nombre: 'Orientaciones' },
  { ruta: '/assets/imgs/colegio1.jpg', nombre: 'Colegio 1' },
  { ruta: '/assets/imgs/colegio2.jpg', nombre: 'Colegio 2' },
  { ruta: '/assets/imgs/colegio3.jpg', nombre: 'Colegio 3' },
  { ruta: '/assets/imgs/colegio4.jpg', nombre: 'Colegio 4' },
  { ruta: '/assets/imgs/colegio5.jpg', nombre: 'Colegio 5' },
  { ruta: '/assets/imgs/colegio6.jpg', nombre: 'Colegio 6' },
  { ruta: '/assets/imgs/colegio7.jpg', nombre: 'Colegio 7' },
  { ruta: '/assets/imgs/colegio8.jpg', nombre: 'Colegio 8' },
];

@Component({
  selector: 'app-formulario-slide',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './formulario-slide.component.html',
  styleUrl: './formulario-slide.component.css',
})
export class FormularioSlideComponent implements OnChanges {
  @Input() slideEditar: Slide | null = null;
  @Input() imagenesExistentes: string[] = [];
  @Output() guardar = new EventEmitter<GuardarSlidePayload>();
  @Output() cancelar = new EventEmitter<void>();

  @ViewChild('inputArchivo') inputArchivo?: ElementRef<HTMLInputElement>;

  formulario: FormGroup;

  archivoImagen: File | null = null;
  rutaElegida: string | null = null;
  previewImagen: string | null = null;
  errorImagen = '';

  readonly imagenesPredeterminadas = IMAGENES_PREDETERMINADAS;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: [''],
      botonTexto: ['Ver más', [Validators.maxLength(100)]],
      orden: [0, [Validators.required, Validators.min(0)]],
      activo: [true],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['slideEditar']) {
      this.archivoImagen = null;
      this.rutaElegida = null;
      this.errorImagen = '';
      if (this.slideEditar) {
        this.formulario.patchValue({
          titulo: this.slideEditar.titulo,
          descripcion: this.slideEditar.descripcion,
          botonTexto: this.slideEditar.botonTexto,
          orden: this.slideEditar.orden,
          activo: this.slideEditar.activo,
        });
        this.previewImagen = this.slideEditar.imagen || null;
      } else {
        this.formulario.reset({ titulo: '', descripcion: '', botonTexto: 'Ver más', orden: 0, activo: true });
        this.previewImagen = null;
      }
    }
  }

  get modoEdicion(): boolean {
    return !!this.slideEditar;
  }

  get opcionesImagen(): OpcionImagen[] {
    const predeterminadas = this.imagenesPredeterminadas.map((o) => o.ruta);
    const extras = this.imagenesExistentes
      .filter((ruta) => !!ruta && !predeterminadas.includes(ruta))
      .map((ruta) => ({ ruta, nombre: 'En uso' }));
    return [...this.imagenesPredeterminadas, ...extras];
  }

  estaSeleccionada(ruta: string): boolean {
    if (this.rutaElegida) return this.rutaElegida === ruta;
    if (this.archivoImagen) return false;
    return !!this.slideEditar && this.slideEditar.imagen === ruta;
  }

  campoInvalido(nombre: string): boolean {
    const control = this.formulario.get(nombre);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  seleccionarRuta(ruta: string): void {
    this.rutaElegida = ruta;
    this.archivoImagen = null;
    this.previewImagen = ruta;
    this.errorImagen = '';
    if (this.inputArchivo) {
      this.inputArchivo.nativeElement.value = '';
    }
  }

  onArchivoSeleccionado(event: Event): void {
    const input = event.target as HTMLInputElement;
    const archivo = input.files && input.files.length ? input.files[0] : null;
    this.archivoImagen = archivo;
    this.errorImagen = '';
    if (archivo) {
      this.rutaElegida = null;
      const lector = new FileReader();
      lector.onload = () => (this.previewImagen = lector.result as string);
      lector.readAsDataURL(archivo);
    }
  }

  onSubmit(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    if (!this.modoEdicion && !this.archivoImagen && !this.rutaElegida) {
      this.errorImagen = 'Elegí una foto para el slide.';
      return;
    }

    const valores = this.formulario.value;
    const formData = new FormData();
    formData.append('titulo', valores.titulo);
    formData.append('descripcion', valores.descripcion || '');
    formData.append('boton_texto', valores.botonTexto || '');
    formData.append('orden', String(valores.orden ?? 0));
    formData.append('activo', valores.activo ? 'true' : 'false');

    if (this.archivoImagen) {
      formData.append('imagen', this.archivoImagen, this.archivoImagen.name);
    } else if (this.rutaElegida) {
      formData.append('imagen_url', this.rutaElegida);
    }

    this.guardar.emit({
      id: this.slideEditar ? this.slideEditar.id : null,
      formData,
    });
  }

  onCancelar(): void {
    this.cancelar.emit();
  }
}
