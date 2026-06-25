import { Component } from '@angular/core';
import { CarrerasService } from 'src/app/services/carreras.service';
import { MateriasService } from 'src/app/services/materias.service';

@Component({
  selector: 'app-tabla-mesa-examen',
  templateUrl: './tabla-mesa-examen.html',
  styleUrl: './tabla-mesa-examen.css',
})
export class TablaMesaExamenComponent {
  materias: any = [];
  carreras: any = [];
  cursos = [1, 2, 3, 4, 5, 6, 7];

  constructor(
    private servicioMateria: MateriasService,
    private servicioCarrera: CarrerasService,
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
}
