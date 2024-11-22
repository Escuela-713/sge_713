import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-agregar-tutor',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './editar-agregar-tutor.component.html',
  styleUrl: './editar-agregar-tutor.component.css'
})
export class EditarAgregarTutorComponent {
  datosTutorForm: FormGroup;
  constructor( private formBuilder: FormBuilder, private router: Router) {
    this.datosTutorForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', Validators.required,],
      cuil: ['', Validators.required],
      genero: ['', Validators.required],
      trabajo: ['', Validators.required],
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
      telefono: ['', Validators.required],
      mailTutor: ['', [Validators.required, Validators.email]],
    });
  }
  get nombre() {
    return this.datosTutorForm.controls['nombre'];
  }
  get nombreErrors() {
    const errors = this.nombre.errors;
    return errors ? (errors['required'] ? 'El nombre es obligatorio.' : null) : null;
  }
  
  get apellido() {
    return this.datosTutorForm.controls['apellido'];
  }
  get apellidoErrors() {
    const errors = this.apellido.errors;
    return errors ? (errors['required'] ? 'El apellido es obligatorio.' : null) : null;
  }
  
  get dni() {
    return this.datosTutorForm.controls['dni'];
  }
  get dniErrors() {
    const errors = this.dni.errors;
    return errors ? (errors['required'] ? 'El DNI es obligatorio.' : null) : null;
  }
  
  get cuil() {
    return this.datosTutorForm.controls['cuil'];
  }
  get cuilErrors() {
    const errors = this.cuil.errors;
    return errors ? (errors['required'] ? 'El CUIL es obligatorio.' : null) : null;
  }
  
  get genero() {
    return this.datosTutorForm.controls['genero'];
  }
  get generoErrors() {
    const errors = this.genero.errors;
    return errors ? (errors['required'] ? 'El género es obligatorio.' : null) : null;
  }
  
  get trabajo() {
    return this.datosTutorForm.controls['trabajo'];
  }
  get trabajoErrors() {
    const errors = this.trabajo.errors;
    return errors ? (errors['required'] ? 'El trabajo es obligatorio.' : null) : null;
  }
  
  get fechaNacimiento() {
    return this.datosTutorForm.controls['fechaNacimiento'];
  }
  get fechaNacimientoErrors() {
    const errors = this.fechaNacimiento.errors;
    return errors ? (errors['required'] ? 'La fecha de nacimiento es obligatoria.' : null) : null;
  }
  
  get provinciaNacimiento() {
    return this.datosTutorForm.controls['provinciaNacimiento'];
  }
  get provinciaNacimientoErrors() {
    const errors = this.provinciaNacimiento.errors;
    return errors ? (errors['required'] ? 'La provincia de nacimiento es obligatoria.' : null) : null;
  }
  
  get localidadNacimiento() {
    return this.datosTutorForm.controls['localidadNacimiento'];
  }
  get localidadNacimientoErrors() {
    const errors = this.localidadNacimiento.errors;
    return errors ? (errors['required'] ? 'La localidad de nacimiento es obligatoria.' : null) : null;
  }
  
  get paisDomicilio() {
    return this.datosTutorForm.controls['paisDomicilio'];
  }
  get paisDomicilioErrors() {
    const errors = this.paisDomicilio.errors;
    return errors ? (errors['required'] ? 'El país del domicilio es obligatorio.' : null) : null;
  }
  
  get provinciaDomicilio() {
    return this.datosTutorForm.controls['provinciaDomicilio'];
  }
  get provinciaDomicilioErrors() {
    const errors = this.provinciaDomicilio.errors;
    return errors ? (errors['required'] ? 'La provincia del domicilio es obligatoria.' : null) : null;
  }
  
  get localidadDomicilio() {
    return this.datosTutorForm.controls['localidadDomicilio'];
  }
  get localidadDomicilioErrors() {
    const errors = this.localidadDomicilio.errors;
    return errors ? (errors['required'] ? 'La localidad del domicilio es obligatoria.' : null) : null;
  }
  
  get barrio() {
    return this.datosTutorForm.controls['barrio'];
  }
  get barrioErrors() {
    const errors = this.barrio.errors;
    return errors ? (errors['required'] ? 'El barrio es obligatorio.' : null) : null;
  }
  
  get calle() {
    return this.datosTutorForm.controls['calle'];
  }
  get calleErrors() {
    const errors = this.calle.errors;
    return errors ? (errors['required'] ? 'La calle es obligatoria.' : null) : null;
  }
  
  get telefono() {
    return this.datosTutorForm.controls['telefono'];
  }
  get telefonoErrors() {
    const errors = this.telefono.errors;
    return errors ? (errors['required'] ? 'El teléfono es obligatorio.' : null) : null;
  }
  
  get mailTutor() {
    return this.datosTutorForm.controls['mailTutor'];
  }
  get mailTutorErrors() {
    const errors = this.mailTutor.errors;
    return errors ? 
      (errors['required'] ? 'El email es obligatorio.' : errors['email'] ? 'El email ingresado es inválido.' : null) : null;
  }
  
}
