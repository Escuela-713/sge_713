import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Evento } from '../editar-evento.models';

export interface GuardarEventoPayload {
  id: number | null;
  formData: FormData;
}

@Component({
  selector: 'app-formulario-evento',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './formulario-evento.component.html',
  styleUrl: './formulario-evento.component.css',
})
export class FormularioEventoComponent implements OnChanges {
  @Input() eventoEditar: Evento | null = null;
  @Output() guardar = new EventEmitter<GuardarEventoPayload>();
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
      horario: [''],
      lugar: [''],
      imagenUrl: [''],
      estado: ['activo', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['eventoEditar']) {
      this.archivoImagen = null;
      if (this.eventoEditar) {
        this.formulario.patchValue({
          titulo: this.eventoEditar.titulo,
          descripcion: this.eventoEditar.descripcion,
          fecha: this.eventoEditar.fecha,
          horario: this.eventoEditar.horario,
          lugar: this.eventoEditar.lugar,
          imagenUrl: this.eventoEditar.imagen,
          estado: this.eventoEditar.estado,
        });
        this.previewImagen = this.eventoEditar.imagen || null;
      } else {
        this.formulario.reset({
          titulo: '', descripcion: '', fecha: '', horario: '', lugar: '', imagenUrl: '', estado: 'activo',
        });
        this.previewImagen = null;
      }
    }
  }

  get modoEdicion(): boolean {
    return !!this.eventoEditar;
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
    formData.append('horario', valores.horario || '');
    formData.append('lugar', valores.lugar || '');
    formData.append('estado', valores.estado);

    if (this.archivoImagen) {
      formData.append('imagen', this.archivoImagen, this.archivoImagen.name);
    } else if (valores.imagenUrl) {
      formData.append('imagen_url', valores.imagenUrl);
    }

    this.guardar.emit({
      id: this.eventoEditar ? this.eventoEditar.id : null,
      formData,
    });
  }

  onCancelar(): void {
    this.cancelar.emit();
  }
}
