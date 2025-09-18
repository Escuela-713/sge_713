import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
@Component({
  selector: 'app-registro-ingresos',
  imports: [ReactiveFormsModule],
  templateUrl: './registro-ingresos.component.html',
  styleUrl: './registro-ingresos.component.css'
})
export class RegistroIngresosComponent {
form!:FormGroup;
constructor(private formBuilder:FormBuilder)
{
  this.form = this.formBuilder.group(
    {
      monto:[''],
      fecha:[''],
      motivo:['']

    }
  );
}
