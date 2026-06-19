import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { DatosPeronalesService } from '../../../../services/datos-personales.service';

interface datosEscolares {
  fechaIngreso: Date;
  fechaEgreso: Date;
  nLibroMatriz: Number;
  legajo: Number;
  escuelaOrigen: Text;
}

@Component({
  selector: 'app-datos-escolares',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './datos-escolares.component.html',
  styleUrls: ['./datos-escolares.component.css'],
})
export class DatosEscolaresComponent {
  datosEscolaresForm: FormGroup;
  datostutor: any;
  constructor(
    private serviciosge: DatosPeronalesService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.datosEscolaresForm = this.formBuilder.group({
      escuelaOrigen: ['', Validators.required],
      legajo: ['', Validators.required],
      fechaIngreso: ['', Validators.required],
      libroMatriz: ['', Validators.required],
      fechaEgreso: ['', Validators.required],
    });
    this.serviciosge.obtenerdatosTutor().subscribe({
      next: (data) => {
        this.datostutor = data['datosTutor'];
        console.log('datosTutor');
        console.log(this.datostutor);
      },
      error: (err) => {
        alert('Se ha producido un error. Por favor, intente nuevamente.');
        console.error(err);
      },
    });
  }
  get escuelaOrigen() {
    return this.datosEscolaresForm.controls['escuelaOrigen'];
  }
  get escuelaOrigenErrors() {
    const errors = this.escuelaOrigen.errors;
    return errors
      ? errors['required']
        ? 'La escuela de origen es obligatoria.'
        : null
      : null;
  }
  get legajo() {
    return this.datosEscolaresForm.controls['legajo'];
  }
  get legajoErrors() {
    const errors = this.legajo.errors;
    return errors
      ? errors['required']
        ? 'El legajo es obligatorio.'
        : null
      : null;
  }
  get fechaIngreso() {
    return this.datosEscolaresForm.controls['fechaIngreso'];
  }
  get fechaIngresoErrors() {
    const errors = this.fechaIngreso.errors;
    return errors
      ? errors['required']
        ? 'La fecha de ingreso es obligatoria.'
        : null
      : null;
  }
  get libroMatriz() {
    return this.datosEscolaresForm.controls['libroMatriz'];
  }
  get libroMatrizErrors() {
    const errors = this.libroMatriz.errors;
    return errors
      ? errors['required']
        ? 'El número de libro matriz es obligatorio.'
        : null
      : null;
  }
  get fechaEgreso() {
    return this.datosEscolaresForm.controls['fechaEgreso'];
  }
  get fechaEgresoErrors() {
    const errors = this.fechaEgreso.errors;
    return errors
      ? errors['required']
        ? 'La fecha de Egreso es obligatoria.'
        : null
      : null;
  }
}
