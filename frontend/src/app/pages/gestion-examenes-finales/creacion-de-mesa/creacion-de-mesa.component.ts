import { Component } from '@angular/core';
import { CarrerasService } from '../../../services/carreras.service';
import { MateriasService } from '../../../services/materias.service';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-creacion-de-mesa',
  imports: [ReactiveFormsModule],
  templateUrl: './creacion-de-mesa.component.html',
  styleUrl: './creacion-de-mesa.component.css',
})
export class CreacionDeMesaComponent {
  materias: any = [];
  carreras: any = [];
  cursos = [1, 2, 3, 4, 5, 6, 7];

  constructor(
    private servicioMateria: MateriasService,
    private servicioCarrera: CarrerasService,
    private fb: FormBuilder,
  ) {
    servicioMateria.obtenerMaterias().subscribe({
      next: (data) => {
        this.materias = data;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {},
    });

    servicioCarrera.obtenerCarreras().subscribe({
      next: (data) => {
        this.carreras = data;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {},
    });
  }

  formularioMesaExamen = this.fb.group({
    ano: ['', [ Validators.required, Validators.min(1), Validators.max(7)]],
    carrera: ['', [Validators.required]],
    materia: ['', [Validators.required]],
    profesorTitular: ['', [Validators.required, Validators.minLength(3)]],
    profesorPrimerVocal: ['', [Validators.required, Validators.minLength(3)]],
    profesorSegundoVocal: ['', [Validators.required, Validators.minLength(3)]],
    fecha: ['', [Validators.required]],
    turno: ['', [Validators.required]],
  })
}