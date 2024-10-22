import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-agregar-tutor',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './editar-agregar-tutor.component.html',
  styleUrl: './editar-agregar-tutor.component.css'
})
export class EditarAgregarTutorComponent {
  datosTutorForm: FormGroup;
  constructor( private formBuilder: FormBuilder, private router: Router) {
    this.datosTutorForm = this.formBuilder.group({
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
  }
}
