import { Component } from '@angular/core';
import type {
  Fecha,
  Mesa,
  Carrera,
  Materia,
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
    inicio: Set<Fecha> | string;
    fin: Set<Fecha> | string;
    hora: Set<string> | string;
  } = {
    inicio: '',
    fin: '',
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
          inicio: new Set(this.mesas.map((mesa) => mesa.fechaInicio)),
          fin: new Set(this.mesas.map((mesa) => mesa.fechaFin)),
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
