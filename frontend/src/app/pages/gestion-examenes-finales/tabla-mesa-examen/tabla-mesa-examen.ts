import { Component } from '@angular/core';
import type {
  Carrera,
  Fecha,
  Materia,
  Mesa,
} from '@models/mesas-examenes.model';
import { CarrerasService } from '@services/carreras.service';
import { MateriasService } from '@services/materias.service';
import { MesasExamenesService } from '@services/mesas-examenes.service';

@Component({
  selector: 'app-tabla-mesa-examen',
  templateUrl: './tabla-mesa-examen.html',
  styleUrl: './tabla-mesa-examen.css',
})
export class TablaMesaExamenComponent {
  materias: any = [];
  carreras: any = [];
  mesas: Mesa[] = [];

  fechasMesas: {
    fecha: Set<Fecha> | string;
    hora: Set<string> | string;
  } = {
    fecha: '',
    hora: '',
  };
  cursos = [1, 2, 3, 4, 5, 6, 7];

  constructor(
    private servicioMateria: MateriasService,
    private servicioCarrera: CarrerasService,
    private servicioMesasExamenes: MesasExamenesService,
  ) {
    servicioMateria.obtenerMaterias().subscribe({
      next: (data: Materia[]) => {
        this.materias = data;
      },
      error: (error: any) => {
        console.error(error);
      },
      complete: () => {},
    });

    servicioCarrera.obtenerCarreras().subscribe({
      next: (data: Carrera[]) => {
        this.carreras = data;
      },
      error: (error: any) => {
        console.error(error);
      },
      complete: () => {},
    });

    servicioMesasExamenes.obtenerMesas().subscribe({
      next: (data: Mesa[]) => {
        this.mesas = data;
        this.fechasMesas = {
          fecha: new Set(this.mesas.map((mesa) => mesa.fecha)),
          hora: new Set(this.mesas.map((mesa) => mesa.hora)),
        };
      },
      error: (error: any) => {
        console.error(error);
      },
      complete: () => {},
    });
  }
}
