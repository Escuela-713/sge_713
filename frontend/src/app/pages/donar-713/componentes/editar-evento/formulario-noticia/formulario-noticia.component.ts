import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Noticia } from '../editar-evento.models';

@Component({
  selector: 'app-formulario-noticia',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './formulario-noticia.component.html',
  styleUrl: './formulario-noticia.component.css',
})
export class FormularioNoticiaComponent implements OnChanges {
  @Input() noticiaEditar: Noticia | null = null;
  @Output() guardar = new EventEmitter<Noticia>();
  @Output() cancelar = new EventEmitter<void>();

  formulario: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      fecha: ['', Validators.required],
      imagen: [''],
      estado: ['reciente', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['noticiaEditar']) {
      if (this.noticiaEditar) {
        this.formulario.patchValue(this.noticiaEditar);
      } else {
        this.formulario.reset({ titulo: '', descripcion: '', fecha: '', imagen: '', estado: 'reciente' });
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

  onSubmit(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const valores = this.formulario.value;
    const noticiaGuardada: Noticia = {
      id: this.noticiaEditar ? this.noticiaEditar.id : Date.now(),
      titulo: valores.titulo,
      descripcion: valores.descripcion,
      fecha: valores.fecha,
      imagen: valores.imagen,
      estado: valores.estado,
    };

    this.guardar.emit(noticiaGuardada);
  }

  onCancelar(): void {
    this.cancelar.emit();
  }
}
