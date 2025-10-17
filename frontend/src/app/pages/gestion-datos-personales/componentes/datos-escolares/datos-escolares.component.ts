import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DatosPeronalesService } from '../../../../services/datos-personales.service';

@Component({
  selector: 'app-datos-escolares',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './datos-escolares.component.html',
  styleUrls: ['./datos-escolares.component.css']
})
export class DatosEscolaresComponent {
  datosEscolaresForm: FormGroup;
  datostutor: any;
  constructor(private serviciosge: DatosPeronalesService, private formBuilder: FormBuilder, private router: Router) {
    this.datosEscolaresForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', Validators.required],
      cuil: ['', Validators.required,],
      genero: ['', Validators.required],
      legajo: ['', Validators.required],
      fechaIngreso: ['', Validators.required],
      NroLibroMatriz: ['', Validators.required],
      fechaEgreso: ['', Validators.required]
    });
    this.serviciosge.obtenerdatosTutor().subscribe(
      {
        next: (data) => {
          this.datostutor = data["datosTutor"];
          console.log("datosTutor");
          console.log(this.datostutor);
        },
        error: (err) => {
          alert("Se ha producido un error. Por favor, intente nuevamente.");
          console.error(err)
        }
      }
    )
  }
  get nombre() {
    return this.datosEscolaresForm.controls['nombre'];
  }
  get nombreErrors() {
    const errors = this.nombre.errors;
    return errors ? (errors['required'] ? 'El nombre es obligatorio.' : null) : null;
  }
  get apellido() {
    return this.datosEscolaresForm.controls['apellido'];
  }
  get apellidoErrors() {
    const errors = this.apellido.errors;
    return errors ? (errors['required'] ? 'El apellido es obligatorio.' : null) : null;
  }
  get dni() {
    return this.datosEscolaresForm.controls['dni'];
  }
  get dniErrors() {
    const errors = this.dni.errors;
    return errors ? (errors['required'] ? 'El dni es obligatorio.' : null) : null;
  }
  get cuil() {
    return this.datosEscolaresForm.controls['cuil'];
  }
  get cuilErrors() {
    const errors = this.cuil.errors;
    return errors ? (errors['required'] ? 'El cuil es obligatorio.' : null) : null;
  }
  get genero() {
    return this.datosEscolaresForm.controls['genero'];
  }
  get generoErrors() {
    const errors = this.genero.errors;
    return errors ? (errors['required'] ? 'El genero es obligatorio.' : null) : null;
  }
  get legajo() {
    return this.datosEscolaresForm.controls['legajo'];
  }
  get legajoErrors() {
    const errors = this.legajo.errors;
    return errors ? (errors['required'] ? 'El legajo es obligatorio.' : null) : null;
  }
  get fechaIngreso() {
    return this.datosEscolaresForm.controls['fechaIngreso'];
  }
  get fechaIngresoErrors() {
    const errors = this.fechaIngreso.errors;
    return errors ? (errors['required'] ? 'La fecha de ingreso es obligatoria.' : null) : null;
  }
  get nroLibroMatriz() {
    return this.datosEscolaresForm.controls['nroLibroMatriz'];
  }
  get nroLibroMatrizErrors() {
    const errors = this.nroLibroMatriz.errors;
    return errors ? (errors['required'] ? 'El número de libro matriz es obligatorio.' : null) : null;
  }
  get fechaEgreso() {
    return this.datosEscolaresForm.controls['fechaEgreso'];
  }
  get fechaEgresoErrors() {
    const errors = this.fechaEgreso.errors;
    return errors ? (errors['required'] ? 'La fecha de Egreso es obligatoria.' : null) : null;
  }
}
