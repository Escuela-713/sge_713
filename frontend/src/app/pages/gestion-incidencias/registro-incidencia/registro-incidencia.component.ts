import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-registro-incidencia',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro-incidencia.component.html',
  styleUrl: './registro-incidencia.component.css'
})
export class RegistroIncidenciaComponent {
  form: FormGroup;
  incidenciaEnviada = false;
  errorEnvio = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nombreCompleto: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      prioridad: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.incidenciaEnviada = true;
      this.errorEnvio = false;
      this.form.reset();
    } else {
      this.form.markAllAsTouched();
      this.errorEnvio = true;
    }
  }
}
