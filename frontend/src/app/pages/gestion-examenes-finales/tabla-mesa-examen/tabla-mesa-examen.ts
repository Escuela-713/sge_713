import { Component } from '@angular/core';
import { Fecha, Mesa } from 'src/app/models/mesas-examenes.model';
import { CarrerasService } from 'src/app/services/carreras.service';
import { MateriasService } from 'src/app/services/materias.service';
import { MesasExamenesService } from 'src/app/services/mesas-examenes.service';

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

    servicioMesasExamenes.obtenerMesas().subscribe({
      next: (data) => {
        this.mesas = data;
        this.fechasMesas = {
          inicio: new Set(this.mesas.map((mesa) => mesa.fechaInicio)),
          fin: new Set(this.mesas.map((mesa) => mesa.fechaFin)),
          hora: new Set(this.mesas.map((mesa) => mesa.hora)),
        };
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {},
    });
  }
}
