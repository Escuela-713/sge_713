import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-filtro-datos-personales',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './filtro-datos-personales.component.html',
  styleUrl: './filtro-datos-personales.component.css',
})
export class FiltroDatosPersonalesComponent {
  filter: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.filter = this.formBuilder.group({
      curso: ['', Validators.required],
      division: ['', Validators.required],
      modalidad: ['', Validators.required,],
      year: ['', Validators.required,]
    });
  }
  get curso() {
    return this.filter.controls['curso'];
  }
   
  get division() {
    return this.filter.controls['division'];
  }

  get modalidad() {
    return this.filter.controls['modalidad'];
  }
   
  get year() {
    return this.filter.controls['year'];
  }

  get isFormValid() {
    return this.filter.valid;
  }

  get cursoErrors() {
    const errors = this.curso.errors;
    return errors ? (errors['required'] ? 'El curso es obligatorio.' : null) : null;
  }

  get divisionErrors() {
    const errors = this.division?.errors;
    return errors ? (errors['required'] ? 'La división es obligatoria' : null) : null;
  }

  get modalidadErrors() {
    const errors = this.modalidad.errors;
    return errors ? (errors['required'] ? 'La modalidad es obligatoria.' : null) : null;
  }

  get yearErrors() {
    const errors = this.year?.errors;
    return errors ? (errors['required'] ? 'El año es obligatorio' : null) : null;
  }
}