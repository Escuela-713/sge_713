import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatosPersonalesService } from '../../../../services/datos-personales.service';
import {
  RegionService,
  Pais,
  Provincia,
  Localidad,
} from '../../../../services/regiones.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-datos-identidad',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './datos-identidad.component.html',
  styleUrls: ['./datos-identidad.component.css'],
})
export class DatosIdentidadComponent implements OnInit {
  datosIdentidadForm: FormGroup;
  datostutor: any;

  paisesDomicilio: Pais[] = [];
  provinciasDomicilio: Provincia[] = [];
  localidadesDomicilio: Localidad[] = [];

  provinciasNacimientoList: Provincia[] = [];
  localidadesNacimientoList: Localidad[] = [];

  constructor(
    @Inject(DatosPersonalesService)
    private serviciosge: DatosPersonalesService,
    private regionService: RegionService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.datosIdentidadForm = this.formBuilder.group({
      dni: ['', [Validators.required, Validators.maxLength(31)]],
      genero: ['', [Validators.required, Validators.maxLength(15)]],
      primerNombre: ['', [Validators.required, Validators.maxLength(127)]],
      segundoNombre: ['', Validators.maxLength(127)],
      tercerNombre: ['', Validators.maxLength(127)],
      primerApellido: ['', [Validators.required, Validators.maxLength(127)]],
      segundoApellido: ['', Validators.maxLength(127)],
      fechaNacimiento: ['', Validators.required],

      paisNacimiento: ['', Validators.required],
      provinciaNacimiento: [{ value: '', disabled: true }, Validators.required],
      localidadNacimiento: [{ value: '', disabled: true }, Validators.required],

      paisDomicilio: ['', Validators.required],
      provinciaDomicilio: [{ value: '', disabled: true }, Validators.required],
      localidadDomicilio: [{ value: '', disabled: true }, Validators.required],

      barrio: ['', [Validators.required, Validators.maxLength(127)]],
      calle: ['', [Validators.required, Validators.maxLength(63)]],
      piso: ['', Validators.maxLength(3)],
      departamento: ['', Validators.maxLength(3)],
      telefono: ['', Validators.required, Validators.maxLength(63)],
      mailAlumno: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(63)],
      ],
      tipoSangre: ['', [Validators.required, Validators.maxLength(7)]],
    });

    this.serviciosge.obtenerdatosTutor().subscribe({
      next: (data) => {
        this.datostutor = data['datosTutor'];
        console.log('datosTutor', this.datostutor);
      },
      error: (err) => {
        alert('Se ha producido un error. Por favor, intente nuevamente.');
        console.error(err);
      },
    });
  }

  ngOnInit(): void {
    this.cargarPaises();
    this.escucharCambiosNacimiento();
    this.escucharCambiosDomicilio();
  }

  private cargarPaises(): void {
    this.regionService.getPaises().subscribe((data) => {
      this.paisesDomicilio = data;
    });
  }

  private escucharCambiosNacimiento(): void {
    this.datosIdentidadForm
      .get('paisNacimiento')
      ?.valueChanges.subscribe((paisId) => {
        this.provinciasNacimientoList = [];
        this.localidadesNacimientoList = [];
        this.datosIdentidadForm.get('provinciaNacimiento')?.setValue('');
        this.datosIdentidadForm.get('localidadNacimiento')?.setValue('');

        if (paisId) {
          this.regionService
            .getProvinciasByPais(Number(paisId))
            .subscribe((data) => {
              this.provinciasNacimientoList = data;
              this.datosIdentidadForm.get('provinciaNacimiento')?.enable();
            });
        } else {
          this.datosIdentidadForm.get('provinciaNacimiento')?.disable();
          this.datosIdentidadForm.get('localidadNacimiento')?.disable();
        }
      });

    this.datosIdentidadForm
      .get('provinciaNacimiento')
      ?.valueChanges.subscribe((provinciaId) => {
        this.localidadesNacimientoList = [];
        this.datosIdentidadForm.get('localidadNacimiento')?.setValue('');

        if (provinciaId) {
          this.regionService
            .getLocalidadesByProvincia(Number(provinciaId))
            .subscribe((data) => {
              this.localidadesNacimientoList = data;
              this.datosIdentidadForm.get('localidadNacimiento')?.enable();
            });
        } else {
          this.datosIdentidadForm.get('localidadNacimiento')?.disable();
        }
      });
  }

  private escucharCambiosDomicilio(): void {
    this.datosIdentidadForm
      .get('paisDomicilio')
      ?.valueChanges.subscribe((paisId) => {
        this.provinciasDomicilio = [];
        this.localidadesDomicilio = [];
        this.datosIdentidadForm.get('provinciaDomicilio')?.setValue('');
        this.datosIdentidadForm.get('localidadDomicilio')?.setValue('');

        if (paisId) {
          this.regionService
            .getProvinciasByPais(Number(paisId))
            .subscribe((data) => {
              this.provinciasDomicilio = data;
              this.datosIdentidadForm.get('provinciaDomicilio')?.enable();
            });
        } else {
          this.datosIdentidadForm.get('provinciaDomicilio')?.disable();
          this.datosIdentidadForm.get('localidadDomicilio')?.disable();
        }
      });

    this.datosIdentidadForm
      .get('provinciaDomicilio')
      ?.valueChanges.subscribe((provinciaId) => {
        this.localidadesDomicilio = [];
        this.datosIdentidadForm.get('localidadDomicilio')?.setValue('');

        if (provinciaId) {
          this.regionService
            .getLocalidadesByProvincia(Number(provinciaId))
            .subscribe((data) => {
              this.localidadesDomicilio = data;
              this.datosIdentidadForm.get('localidadDomicilio')?.enable();
            });
        } else {
          this.datosIdentidadForm.get('localidadDomicilio')?.disable();
        }
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
    return null;
  }
  get tercerNombre() {
    return this.datosIdentidadForm.controls['tercerNombre'];
  }
  get tercerNombreErrors() {
    return null;
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
    return null;
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
  get paisNacimiento() {
    return this.datosIdentidadForm.controls['paisNacimiento'];
  }
  get paisNacimientoErrors() {
    const errors = this.paisNacimiento?.errors;
    return errors
      ? errors['required']
        ? 'El país de nacimiento es obligatorio.'
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
    return this.datosIdentidadForm.controls['mailAlumno'];
  }
  get mailErrors() {
    const errors = this.mail?.errors;
    return errors
      ? errors['required']
        ? 'El email es obligatorio.'
        : errors['email']
          ? 'El mail ingresado es invalido.'
          : null
      : null;
  }
}
