import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CooperadoraMovimientosService } from '@services/cooperadora-movimientos.service';

@Component({
  selector: 'app-formulario',
  imports: [ReactiveFormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {

  form: FormGroup;
  montoFormateado = '';
  enviando = false;
  mensaje = '';
  registroExitoso = false;

  constructor(
    private formbuilder: FormBuilder,
    private movimientosService: CooperadoraMovimientosService
  ) {
    this.form = this.formbuilder.group({
      monto: [null, [Validators.required, Validators.min(0.01)]],
      fecha: ['', [Validators.required]],
      motivo: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      origen: ['', [Validators.required, Validators.maxLength(100)]],
      destino: ['', [Validators.required, Validators.maxLength(100)]],
      tipo: ['', Validators.required]
    });
  }

  get Monto() { return this.form.controls['monto']; }
  get Fecha() { return this.form.controls['fecha']; }
  get Motivo() { return this.form.controls['motivo']; }
  get Origen() { return this.form.controls['origen']; }
  get Destino() { return this.form.controls['destino']; }
  get tipo()  { return this.form.controls['tipo']; }

  actualizarMonto(event: Event): void {
    const input = event.target as HTMLInputElement;
    const digitos = input.value.replace(/\D/g, '');
    const monto = digitos ? Number(digitos) : null;

    this.montoFormateado = monto === null
      ? ''
      : `$${new Intl.NumberFormat('es-AR', { maximumFractionDigits: 0 }).format(monto)}`;
    input.value = this.montoFormateado;
    this.Monto.setValue(monto);
    this.Monto.markAsDirty();
    this.Monto.markAsTouched();
  }

  registrarMovimiento(): void {
    if (this.form.invalid || this.enviando) {
      this.form.markAllAsTouched();
      return;
    }

    const movimiento = {
      ...this.form.value,
      descripcion: this.form.value.motivo
    };
    delete movimiento.motivo;

    this.enviando = true;
    this.mensaje = '';

    this.movimientosService.crearMovimiento(movimiento).subscribe({
      next: () => {
        this.form.reset();
        this.montoFormateado = '';
        this.registroExitoso = true;
        this.mensaje = 'Movimiento registrado correctamente.';
        this.enviando = false;
      },
      error: () => {
        this.registroExitoso = false;
        this.mensaje = 'No se pudo registrar el movimiento.';
        this.enviando = false;
      }
    });
  }
}

 