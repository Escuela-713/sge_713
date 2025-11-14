import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  imports: [ReactiveFormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {

  form: FormGroup;

  constructor(private formbuilder: FormBuilder) {
    this.form = this.formbuilder.group({
      monto: ['', [Validators.required, Validators.min(0.01)]],
      fecha: ['', [Validators.required]],
      motivo: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]]
    });
  }

  get Monto() { return this.form.get('monto'); }
  get Fecha() { return this.form.get('fecha'); }
  get Motivo() { return this.form.get('motivo'); }
}

 