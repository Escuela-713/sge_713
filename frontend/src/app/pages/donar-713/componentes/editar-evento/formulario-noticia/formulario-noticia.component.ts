import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Noticia } from '../editar-evento.models';

export interface GuardarNoticiaPayload {
  id: number | null;
  formData: FormData;
}

@Component({
  selector: 'app-formulario-noticia',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './formulario-noticia.component.html',
  styleUrl: './formulario-noticia.component.css',
})
export class FormularioNoticiaComponent implements OnChanges {
  @Input() noticiaEditar: Noticia | null = null;
  @Output() guardar = new EventEmitter<GuardarNoticiaPayload>();
  @Output() cancelar = new EventEmitter<void>();

  formulario: FormGroup;

  // Imagen: se puede subir un archivo nuevo o dejar/editar la URL existente.
  archivoImagen: File | null = null;
  previewImagen: string | null = null;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      fecha: ['', Validators.required],
      imagenUrl: [''],
      estado: ['reciente', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['noticiaEditar']) {
      this.archivoImagen = null;
      if (this.noticiaEditar) {
        this.formulario.patchValue({
          titulo: this.noticiaEditar.titulo,
          descripcion: this.noticiaEditar.descripcion,
          fecha: this.noticiaEditar.fecha,
          imagenUrl: this.noticiaEditar.imagen,
          estado: this.noticiaEditar.estado,
        });
        this.previewImagen = this.noticiaEditar.imagen || null;
      } else {
        this.formulario.reset({ titulo: '', descripcion: '', fecha: '', imagenUrl: '', estado: 'reciente' });
        this.previewImagen = null;
      }
    }
  }

  get modoEdicion(): boolean {
    return !!this.noticiaEditar;
  }

  campoInvalido(nombre: string): boolean {
    const control = this.formulario.get(nombre);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  onArchivoSeleccionado(event: Event): void {
    const input = event.target as HTMLInputElement;
    const archivo = input.files && input.files.length ? input.files[0] : null;
    this.archivoImagen = archivo;
    if (archivo) {
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

    const valores = this.formulario.value;
    const formData = new FormData();
    formData.append('titulo', valores.titulo);
    formData.append('descripcion', valores.descripcion);
    formData.append('fecha', valores.fecha);
    formData.append('estado', valores.estado);

    if (this.archivoImagen) {
      formData.append('imagen', this.archivoImagen, this.archivoImagen.name);
    } else if (valores.imagenUrl) {
      formData.append('imagen_url', valores.imagenUrl);
    }

    this.guardar.emit({
      id: this.noticiaEditar ? this.noticiaEditar.id : null,
      formData,
    });
  }

  onCancelar(): void {
    this.cancelar.emit();
  }
}
