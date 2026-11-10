import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Informacion } from '../editar-evento.models';
import { InformacionPayload } from '../../../../../services/donar.service';

export interface GuardarInformacionPayload {
  id: number | null;
  datos: InformacionPayload;
}

export const ICONOS_INFORMACION: { valor: InformacionPayload['icono']; etiqueta: string }[] = [
  { valor: 'edad', etiqueta: 'Persona' },
  { valor: 'peso', etiqueta: 'Balanza' },
  { valor: 'salud', etiqueta: 'Corazón' },
  { valor: 'identificacion', etiqueta: 'Documento' },
  { valor: 'descanso', etiqueta: 'Reloj' },
  { valor: 'alimentacion', etiqueta: 'Cubiertos' },
  { valor: 'gota', etiqueta: 'Gota' },
  { valor: 'calendario', etiqueta: 'Calendario' },
];

@Component({
  selector: 'app-formulario-informacion',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './formulario-informacion.component.html',
  styleUrl: './formulario-informacion.component.css',
})
export class FormularioInformacionComponent implements OnChanges {
  @Input() infoEditar: Informacion | null = null;
  @Input() tipoInicial: 'requisito' | 'pregunta' = 'requisito';
  @Output() guardar = new EventEmitter<GuardarInformacionPayload>();
  @Output() cancelar = new EventEmitter<void>();

  formulario: FormGroup;
  iconos = ICONOS_INFORMACION;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      tipo: ['requisito', Validators.required],
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.minLength(3)]],
      icono: ['salud'],
      orden: [0, [Validators.required, Validators.min(0)]],
      activo: [true],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['infoEditar'] || changes['tipoInicial']) {
      if (this.infoEditar) {
        this.formulario.patchValue({
          tipo: this.infoEditar.tipo,
          titulo: this.infoEditar.titulo,
          descripcion: this.infoEditar.descripcion,
          icono: this.infoEditar.icono || 'salud',
          orden: this.infoEditar.orden,
          activo: this.infoEditar.activo,
        });
      } else {
        this.formulario.reset({
          tipo: this.tipoInicial,
          titulo: '',
          descripcion: '',
          icono: 'salud',
          orden: 0,
          activo: true,
        });
      }
    }
  }

  get modoEdicion(): boolean {
    return !!this.infoEditar;
  }

  get esRequisito(): boolean {
    return this.formulario.get('tipo')?.value === 'requisito';
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
    this.guardar.emit({
      id: this.infoEditar ? this.infoEditar.id : null,
      datos: {
        tipo: valores.tipo,
        titulo: valores.titulo,
        descripcion: valores.descripcion,
        icono: valores.tipo === 'requisito' ? valores.icono : '',
        orden: Number(valores.orden ?? 0),
        activo: !!valores.activo,
      },
    });
  }

  onCancelar(): void {
    this.cancelar.emit();
  }
}
