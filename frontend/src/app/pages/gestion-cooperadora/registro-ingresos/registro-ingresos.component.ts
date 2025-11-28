import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro-ingresos',
  imports: [ReactiveFormsModule],
  templateUrl: './registro-ingresos.component.html',
  styleUrl: './registro-ingresos.component.css'
})
export class RegistroIngresosComponent {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {

    this.form = this.formBuilder.group({
      monto: ['', [Validators.required, Validators.min(0.01)]],
      fecha: ['', [Validators.required]],
      motivo: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]]
    });

  }

  get Monto() {
    return this.form.get('monto');
  }
  get Fecha() {
    return this.form.get('fecha');
  }
  get Motivo() {
    return this.form.get('motivo');
  }
}

