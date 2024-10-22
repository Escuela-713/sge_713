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
}