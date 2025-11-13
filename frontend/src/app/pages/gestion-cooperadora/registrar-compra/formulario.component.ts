import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

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
      monto:['Ingresar monto'],
      fecha:['Ingresar fecha'],
      motivo:['Ingresar motivo']
    });
  }
}
