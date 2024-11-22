import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DatosPeronalesService } from '../../../../service/datos-personales.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-datos-identidad',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './datos-identidad.component.html',
  styleUrls: ['./datos-identidad.component.css']
})
export class DatosIdentidadComponent {
  datosIdentidadForm: FormGroup;
  datostutor: any;
  constructor(private serviciosge: DatosPeronalesService, private formBuilder: FormBuilder, private router: Router) {
    this.datosIdentidadForm = this.formBuilder.group({
      fechaNacimiento: ['', Validators.required],
      provinciaNacimiento: ['', Validators.required],
      localidadNacimiento: ['', Validators.required,],
      paisDomicilio: ['', Validators.required,],
      provinciaDomicilio: ['', Validators.required],
      localidadDomicilio: ['', Validators.required],
      barrio: ['', Validators.required,],
      calle: ['', Validators.required,],
      nroPiso: [''],
      nroDpto: [''],
      telefono: [''],
      mailAlumno: ['', [Validators.required, Validators.email]],
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
  get fechaNacimiento() {
    return this.datosIdentidadForm.controls['fechaNacimiento'];
  }
  get fechaNacimientoErrors() {
    const errors = this.fechaNacimiento.errors;
    return errors ? (errors['required'] ? 'La fecha de nacimiento es obligatoria.' : null) : null;
  }
   
  get provinciaNacimiento() {
    return this.datosIdentidadForm.controls['provinciaNacimiento'];
  }
  get provinciaNacimientoErrors() {
    const errors = this.provinciaNacimiento?.errors;
    return errors ? (errors['required'] ? 'La provincia de nacimiento es obligatoria' : null) : null;
  }
  get localidadNacimiento() {
    return this.datosIdentidadForm.controls['localidadNacimiento'];
  }
  get localidadNacimientoErrors() {
    const errors = this.localidadNacimiento.errors;
    return errors ? (errors['required'] ? 'La localidad de nacimiento es obligatoria.' : null) : null;
  }
  get paisDomicilio() {
    return this.datosIdentidadForm.controls['paisDomicilio'];
  }
  get paisDomicilioErrors() {
    const errors = this.paisDomicilio?.errors;
    return errors ? (errors['required'] ? 'El pais del domicilio es obligatorio' : null) : null;
  }

  get isFormValid() {
    return this.datosIdentidadForm.valid;
  }
  get provinciaDomicilio() {
    return this.datosIdentidadForm.controls['provinciaDomicilio'];
  }
  get provinciaDomicilioErrors() {
    const errors = this.provinciaDomicilio.errors;
    return errors ? (errors['required'] ? 'La provincia del domicilio es obligatoria.' : null) : null;
  }
  get localidadDomicilio() {
    return this.datosIdentidadForm.controls['localidadDomicilio'];
  }
  get localidadDomicilioErrors() {
    const errors = this.localidadDomicilio.errors;
    return errors ? (errors['required'] ? 'La localidad es obligatoria.' : null) : null;
  }
  get barrio() {
    return this.datosIdentidadForm.controls['barrio'];
  }
  get barrioErrors() {
    const errors = this.barrio.errors;
    return errors ? (errors['required'] ? 'El barrio es obligatorio.' : null) : null;
  }
  get calle() {
    return this.datosIdentidadForm.controls['calle'];
  }
  get calleErrors() {
    const errors = this.calle.errors;
    return errors ? (errors['required'] ? 'El calle es obligatorio.' : null) : null;
  }
  get mailAlumno() {
    return this.datosIdentidadForm.controls['mailAlumno'];
  }
  get mailAlumnoErrors() {
    const errors = this.mailAlumno.errors;
    return errors ? (errors['required'] ? 'El email es obligatorio.' : errors['email'] ? 'El mail ingresado es invalido.' : null) : null;
  }
}