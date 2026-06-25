import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DatosPersonalesService } from '../../../../services/datos-personales.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Text } from '@angular/compiler';

interface datosIdentidad {
  dni: Text;
  genero: 'Femenino'| 'Masculino' | 'Otro';
  primerNombre: Text;
  segundoNombre: Text;
  tercerNombre: Text;
  primerApellido: Text;
  segundoApellido: Text;
  fechaNacimiento: Date;
  provinciaNacimiento: Text;
  localidadNacimiento: Text;
  paisDomicilio: Text;
  provinciaDomicilio: Text;
  localidadDomicilio: Text;
  barrio: Text;
  calle: Text;
  altura: Text;
  piso: Text;
  departamento: Text;
  telefono: Text;
  mail: Text;
  tipo_de_sangre: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
}

@Component({
  selector: 'app-datos-identidad',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './datos-identidad.component.html',
  styleUrls: ['./datos-identidad.component.css'],
})
export class DatosIdentidadComponent {
  datosIdentidadForm: FormGroup;
  datostutor: any;
  constructor(
    private serviciosge: DatosPersonalesService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.datosIdentidadForm = this.formBuilder.group({
      dni: ['', Validators.required, Validators.maxLength(31)],
      genero: ['', Validators.required, Validators.maxLength(15)],
      primerNombre: ['', Validators.required, Validators.maxLength(127)],
      segundoNombre: ['', Validators.maxLength(127)],
      tercerNombre: ['', Validators.maxLength(127)],
      primerApellido: ['', Validators.required, Validators.maxLength(127)],
      segundoApellido: ['', Validators.maxLength(127)],
      fechaNacimiento: ['', Validators.required],
      provinciaNacimiento: ['', Validators.required],
      localidadNacimiento: ['', Validators.required],
      paisDomicilio: ['', Validators.required],
      provinciaDomicilio: ['', Validators.required],
      localidadDomicilio: ['', Validators.required],
      barrio: ['', Validators.required, Validators.maxLength(127)],
      calle: ['', Validators.required, Validators.maxLength(63)],
      piso: ['', Validators.maxLength(3)],
      departamento: ['', Validators.maxLength(3)],
      telefono: ['', Validators.maxLength(63)],
      mailAlumno: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(63)],
      ],
      tipoSangre: ['', Validators.required, Validators.maxLength(7)],
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
  get dni() {
    return this.datosIdentidadForm.controls['dni'];
  }
  get dniErrors() {
    const errors = this.dni.errors;
    return errors
      ? errors['required']
        ? 'El DNI es obligatorio.'
        : null
      : null;
  }
  get genero() {
    return this.datosIdentidadForm.controls['genero'];
  }
  get generoErrors() {
    const errors = this.genero.errors;
    return errors
      ? errors['required']
        ? 'El género es obligatorio.'
        : null
      : null;
  }
  get primerNombre() {
    return this.datosIdentidadForm.controls['primerNombre'];
  }
  get primerNombreErrors() {
    const errors = this.primerNombre.errors;
    return errors
      ? errors['required']
        ? 'El primer nombre es obligatorio.'
        : null
      : null;
  }
  get segundoNombre() {
    return this.datosIdentidadForm.controls['segundoNombre'];
  }
  get segundoNombreErrors() {
    const errors = this.segundoNombre.errors;
    return errors ? (errors[''] ? '' : null) : null;
  }
  get primerApellido() {
    return this.datosIdentidadForm.controls['primerApellido'];
  }
  get primerApellidoErrors() {
    const errors = this.primerApellido.errors;
    return errors
      ? errors['required']
        ? 'El primer apellido es obligatorio.'
        : null
      : null;
  }
  get segundoApellido() {
    return this.datosIdentidadForm.controls['segundoApellido'];
  }
  get segundoApellidoErrors() {
    const errors = this.segundoApellido.errors;
    return errors
      ? errors['invalid']
        ? 'El segundo apellido es obligatorio'
        : null
      : null;
  }

  get fechaNacimiento() {
    return this.datosIdentidadForm.controls['fechaNacimiento'];
  }
  get fechaNacimientoErrors() {
    const errors = this.fechaNacimiento.errors;
    return errors
      ? errors['required']
        ? 'La fecha de nacimiento es obligatoria.'
        : null
      : null;
  }

  get provinciaNacimiento() {
    return this.datosIdentidadForm.controls['provinciaNacimiento'];
  }
  get provinciaNacimientoErrors() {
    const errors = this.provinciaNacimiento?.errors;
    return errors
      ? errors['required']
        ? 'La provincia de nacimiento es obligatoria'
        : null
      : null;
  }
  get localidadNacimiento() {
    return this.datosIdentidadForm.controls['localidadNacimiento'];
  }
  get localidadNacimientoErrors() {
    const errors = this.localidadNacimiento.errors;
    return errors
      ? errors['required']
        ? 'La localidad de nacimiento es obligatoria.'
        : null
      : null;
  }
  get paisDomicilio() {
    return this.datosIdentidadForm.controls['paisDomicilio'];
  }
  get paisDomicilioErrors() {
    const errors = this.paisDomicilio?.errors;
    return errors
      ? errors['required']
        ? 'El pais del domicilio es obligatorio'
        : null
      : null;
  }

  get isFormValid() {
    return this.datosIdentidadForm.valid;
  }
  get provinciaDomicilio() {
    return this.datosIdentidadForm.controls['provinciaDomicilio'];
  }
  get provinciaDomicilioErrors() {
    const errors = this.provinciaDomicilio.errors;
    return errors
      ? errors['required']
        ? 'La provincia del domicilio es obligatoria.'
        : null
      : null;
  }
  get localidadDomicilio() {
    return this.datosIdentidadForm.controls['localidadDomicilio'];
  }
  get localidadDomicilioErrors() {
    const errors = this.localidadDomicilio.errors;
    return errors
      ? errors['required']
        ? 'La localidad es obligatoria.'
        : null
      : null;
  }
  get barrio() {
    return this.datosIdentidadForm.controls['barrio'];
  }
  get barrioErrors() {
    const errors = this.barrio.errors;
    return errors
      ? errors['required']
        ? 'El barrio es obligatorio.'
        : null
      : null;
  }
  get telefono() {
    return this.datosIdentidadForm.controls['telefono'];
  }
  get telefonoErrors() {
    const errors = this.telefono.errors;
    return errors
      ? errors['required']
        ? 'El número de telefono es obligatorio.'
        : null
      : null;
  }
  get calle() {
    return this.datosIdentidadForm.controls['calle'];
  }
  get calleErrors() {
    const errors = this.calle.errors;
    return errors
      ? errors['maxLength']
        ? 'Excede el máximo de carácteres.'
        : null
      : null;
  }
  get mail() {
    return this.datosIdentidadForm.controls['mail'];
  }
  get mailErrors() {
    const errors = this.mail.errors;
    return errors
      ? errors['required']
        ? 'El email es obligatorio.'
        : errors['email']
          ? 'El mail ingresado es invalido.'
          : null
      : null;
  }
}
