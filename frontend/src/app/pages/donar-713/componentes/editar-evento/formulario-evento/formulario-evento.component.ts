import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Evento } from '../editar-evento.models';

@Component({
  selector: 'app-formulario-evento',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './formulario-evento.component.html',
  styleUrl: './formulario-evento.component.css',
})
export class FormularioEventoComponent implements OnChanges {
  @Input() eventoEditar: Evento | null = null;
  @Output() guardar = new EventEmitter<Evento>();
  @Output() cancelar = new EventEmitter<void>();

  formulario: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      fecha: ['', Validators.required],
      imagen: [''],
      estado: ['activo', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['eventoEditar']) {
      if (this.eventoEditar) {
        this.formulario.patchValue(this.eventoEditar);
      } else {
        this.formulario.reset({ titulo: '', descripcion: '', fecha: '', imagen: '', estado: 'activo' });
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

  onSubmit(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const valores = this.formulario.value;
    const eventoGuardado: Evento = {
      id: this.eventoEditar ? this.eventoEditar.id : Date.now(),
      titulo: valores.titulo,
      descripcion: valores.descripcion,
      fecha: valores.fecha,
      imagen: valores.imagen,
      estado: valores.estado,
    };

    this.guardar.emit(eventoGuardado);
  }

  onCancelar(): void {
    this.cancelar.emit();
  }
}
