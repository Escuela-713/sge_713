import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core'
import type {
  Carrera,
  Dia,
  FiltroMesaExamen,
  Materia,
  Mesa,
} from '@models/mesas-examenes.model'
import { CarrerasService } from '@services/carreras.service'
import { MateriasService } from '@services/materias.service'
import { MesasExamenesService } from '@services/mesas-examenes.service'
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms'

interface FechasMesas {
  dia: Set<Dia> | string
  hora: Set<string> | string
}

@Component({
  selector: 'app-tabla-mesa-examen',
  templateUrl: './tabla-mesa-examen.html',
  styleUrl: './tabla-mesa-examen.css',
  imports: [ReactiveFormsModule],
})
export class TablaMesaExamenComponent implements OnInit {
  private servicioMateria = inject(MateriasService)
  private servicioCarrera = inject(CarrerasService)
  private servicioMesasExamenes = inject(MesasExamenesService)
  private cdr = inject(ChangeDetectorRef)
  private fb = inject(FormBuilder)

  materias: Materia[] = []
  carreras: Carrera[] = []
  mesas: Mesa[] = []

  fechasMesas: FechasMesas = {
    dia: '',
    hora: '',
  }
  cursos = [1, 2, 3, 4, 5, 6, 7]

  formularioTablaDeMesas = this.fb.group({
    dia: [''],
    hora: [''],
    materia: [''],
    carrera: [''],
    ano: [''],
    curso: [''],
  })

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
          dia: new Set(this.mesas.map((mesa) => mesa.dia)),
          hora: new Set(this.mesas.map((mesa) => mesa.hora)),
        }
      },
      error: (error: unknown) => console.error(error),
      complete: () => this.cdr.detectChanges(),
    })
  }

  obtenerMesasConFiltros() {
    const filtros = this.formularioTablaDeMesas.value
    this.servicioMesasExamenes
      .obtenerMesas(filtros as FiltroMesaExamen)
      .subscribe({
        next: (data: Mesa[]) => {
          this.mesas = data
          this.fechasMesas = {
            dia: new Set(this.mesas.map((mesa) => mesa.dia)),
            hora: new Set(this.mesas.map((mesa) => mesa.hora)),
          }
        },
        error: (error: unknown) => console.error(error),
        complete: () => this.cdr.detectChanges(),
      })
  }
}
