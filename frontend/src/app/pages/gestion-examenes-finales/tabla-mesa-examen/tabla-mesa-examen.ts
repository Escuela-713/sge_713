import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core'
import type { Carrera, Dia, Materia, Mesa } from '@models/mesas-examenes.model'
import { CarrerasService } from '@services/carreras.service'
import { MateriasService } from '@services/materias.service'
import { MesasExamenesService } from '@services/mesas-examenes.service'

interface FechasMesas {
  fecha: Set<Dia> | string
  hora: Set<string> | string
}

@Component({
  selector: 'app-tabla-mesa-examen',
  templateUrl: './tabla-mesa-examen.html',
  styleUrl: './tabla-mesa-examen.css',
})
export class TablaMesaExamenComponent implements OnInit {
  private servicioMateria = inject(MateriasService)
  private servicioCarrera = inject(CarrerasService)
  private servicioMesasExamenes = inject(MesasExamenesService)
  private cdr = inject(ChangeDetectorRef)

  materias: Materia[] = []
  carreras: Carrera[] = []
  mesas: Mesa[] = []

  fechasMesas: FechasMesas = {
    fecha: '',
    hora: '',
  }
  cursos = [1, 2, 3, 4, 5, 6, 7]

  ngOnInit(): void {
    this.servicioMateria.obtenerMaterias().subscribe({
      next: (data: Materia[]) => {
        this.materias = data
      },
      error: (error: unknown) => {
        console.error(error)
      },
      complete: () => this.cdr.detectChanges(),
    })

    this.servicioCarrera.obtenerCarreras().subscribe({
      next: (data: Carrera[]) => (this.carreras = data),
      error: (error: unknown) => console.error(error),
      complete: () => {},
    })

    this.servicioMesasExamenes.obtenerMesas().subscribe({
      next: (data: Mesa[]) => {
        this.mesas = data
        this.fechasMesas = {
          fecha: new Set(this.mesas.map((mesa) => mesa.dia)),
          hora: new Set(this.mesas.map((mesa) => mesa.hora)),
        }
      },
      error: (error: unknown) => console.error(error),
      complete: () => this.cdr.detectChanges(),
    })
  }
}
