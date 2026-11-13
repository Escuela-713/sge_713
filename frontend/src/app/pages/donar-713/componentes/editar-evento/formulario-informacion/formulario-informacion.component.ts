import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Informacion, TipoInformacion } from '../editar-evento.models';

export interface GuardarInformacionPayload {
  id: number | null;
  formData: FormData;
}

const TAMANO_MAXIMO_IMAGEN = 5 * 1024 * 1024; // 5 MB, igual que en el backend

@Component({
  selector: 'app-formulario-informacion',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './formulario-informacion.component.html',
  styleUrl: './formulario-informacion.component.css',
})
export class FormularioInformacionComponent implements OnChanges {
  @Input() infoEditar: Informacion | null = null;
  @Input() tipos: TipoInformacion[] = [];
  @Input() tipoInicial = '';
  @Output() guardar = new EventEmitter<GuardarInformacionPayload>();
  @Output() cancelar = new EventEmitter<void>();
  @Output() administrarTipos = new EventEmitter<void>();

  formulario: FormGroup;

  archivoImagen: File | null = null;
  previewImagen: string | null = null;
  errorImagen = '';

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      tipo: ['', Validators.required],
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.minLength(3)]],
      orden: [0, [Validators.required, Validators.min(0)]],
      activo: [true],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['infoEditar'] || changes['tipoInicial']) {
      this.archivoImagen = null;
      this.errorImagen = '';
      if (this.infoEditar) {
        this.formulario.patchValue({
          tipo: this.infoEditar.tipo,
          titulo: this.infoEditar.titulo,
          descripcion: this.infoEditar.descripcion,
          orden: this.infoEditar.orden,
          activo: this.infoEditar.activo,
        });
        this.previewImagen = this.infoEditar.imagen || null;
      } else {
        this.formulario.reset({
          tipo: this.tipoInicial,
          titulo: '',
          descripcion: '',
          orden: 0,
          activo: true,
        });
        this.previewImagen = null;
      }
    }

    if (changes['tipos'] || changes['infoEditar'] || changes['tipoInicial']) {
      this.asegurarTipoValido();
    }
  }

  // Si el tipo elegido ya no está en la lista (por ejemplo, se renombró o se eliminó), elige el primero.
  private asegurarTipoValido(): void {
    const actual = this.formulario.get('tipo')?.value;
    if (!this.tipos.some((t) => t.nombre === actual)) {
      this.formulario.patchValue({ tipo: this.tipos[0]?.nombre ?? '' });
    }
  }

  get modoEdicion(): boolean {
    return !!this.infoEditar;
  }

  campoInvalido(nombre: string): boolean {
    const control = this.formulario.get(nombre);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  onArchivoSeleccionado(event: Event): void {
    const input = event.target as HTMLInputElement;
    const archivo = input.files && input.files.length ? input.files[0] : null;
    this.errorImagen = '';

    if (!archivo) {
      return;
    }

    if (!archivo.type.startsWith('image/')) {
      this.errorImagen = 'El archivo tiene que ser una imagen (JPG, PNG, WEBP, etc.).';
      input.value = '';
      return;
    }

    if (archivo.size > TAMANO_MAXIMO_IMAGEN) {
      this.errorImagen = 'La imagen no puede pesar más de 5 MB.';
      input.value = '';
      return;
    }

    this.archivoImagen = archivo;
    const lector = new FileReader();
    lector.onload = () => (this.previewImagen = lector.result as string);
    lector.readAsDataURL(archivo);
  }

  onSubmit(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const valores = this.formulario.value;
    const formData = new FormData();
    formData.append('tipo', valores.tipo);
    formData.append('titulo', valores.titulo);
    formData.append('descripcion', valores.descripcion);
    formData.append('orden', String(Number(valores.orden ?? 0)));
    formData.append('activo', String(!!valores.activo));

    // La imagen solo se sube como archivo. Si no se elige una nueva, se conserva la que ya tenía.
    if (this.archivoImagen) {
      formData.append('imagen', this.archivoImagen, this.archivoImagen.name);
    }

    this.guardar.emit({
      id: this.infoEditar ? this.infoEditar.id : null,
      formData,
    });
  }

  onCancelar(): void {
    this.cancelar.emit();
  }
}
