import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-filtro-datos-personales',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './filtro-datos-personales.component.html',
  styleUrl: './filtro-datos-personales.component.css',
})
export class FiltroDatosPersonalesComponent {
  filter: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.filter = this.formBuilder.group({
      nombreApellido: [''],
      dni: ['']
    });
  }

  get nombreApellido() { return this.filter.controls['nombreApellido']; }
  get dni() { return this.filter.controls['dni']; }

  filtrar() {
    const { nombreApellido, dni } = this.filter.value;

    // Si ambos están vacíos, no navegamos
    if (!nombreApellido.trim() && !dni.trim()) {
      return;
    }

  }

  redirigir() {
    this.router.navigate(['/dashboard/datos-personales']);
  }
}