import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core'
import type {
  Carrera,
  Dia,
  FiltroMesaExamen,
  Inscripcion,
  Materia,
  Mesa,
} from '@models/mesas-examenes.model'
import { CarrerasService } from '@services/carreras.service'
import { MateriasService } from '@services/materias.service'
import { MesasExamenesService } from '@services/mesas-examenes.service'
import { ReactiveFormsModule, FormBuilder } from '@angular/forms'

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
  todasLasMesas: Mesa[] = []
  mesasConFiltros: Mesa[] = []
  mesas: Mesa[] = []
  error: string = ''

  fechasMesas: FechasMesas = {
    dia: '',
    hora: '',
  }
  anos = [1, 2, 3, 4, 5, 6, 7]

  formularioTablaDeMesas = this.fb.group({
    dia: [null],
    hora: [null],
    id_materia: [null],
    id_carrera: [null],
    ano: [null],
  })

  ngOnInit(): void {
    this.servicioMateria.obtenerMaterias().subscribe({
      next: (materias) => {
        this.materias = materias.data
      },
      error: (error: unknown) => {
        console.error(error)
      },
      complete: () => this.cdr.detectChanges(),
    })

    this.servicioCarrera.obtenerCarreras().subscribe({
      next: (carreras) => {
        this.carreras = carreras.data
      },
      error: (error: unknown) => console.error(error),
      complete: () => this.cdr.detectChanges(),
    })

    this.servicioMesasExamenes.obtenerMesas().subscribe({
      next: (mesas) => {
        this.todasLasMesas = mesas.data
        this.fechasMesas = {
          dia: new Set(mesas.data.map((mesa) => mesa.dia)),
          hora: new Set(mesas.data.map((mesa) => mesa.hora)),
        }
        this.mesas = this.todasLasMesas
      },
      error: (error) => {
        if (error.status === 404) {
          this.error = error.error.message
        }
      },
      complete: () => this.cdr.detectChanges(),
    })
  }

  obtenerMesasConFiltros() {
    const filtros = this.formularioTablaDeMesas.value

    // Esto verifica que no haya ningún valor en los filtros para evitar hacer llamadas innecesarias a la api
    if (Object.values(filtros).every(valor => valor === '' || !valor)) return

    this.servicioMesasExamenes
      .obtenerMesas(filtros as FiltroMesaExamen)
      .subscribe({
        next: (mesas) => {
          this.mesasConFiltros = mesas.data
          this.mesas = this.mesasConFiltros
        },
        error: (error) => {
          if (error.status === 404) {
            this.mesas = []
            this.error = error.error.message
          }
        },
        complete: () => this.cdr.detectChanges(),
      })
  }

  inscribirse(event: any) {
    const idMesa = event.target.id
    const idAlumno = Number(window.localStorage.getItem('auth_token'))
    const objetoDeInscripcion: Inscripcion = {
      id_mesa_examen: idMesa,
      id_alumno: idAlumno,
    }

    if (!objetoDeInscripcion.id_alumno) {
      alert('inicie sesion para inscribirse a la mesa.')
    }

    if (!objetoDeInscripcion.id_mesa_examen) {
      alert('hubo un error inesperado.')
    }

    this.servicioMesasExamenes.inscribirse(objetoDeInscripcion).subscribe({
      next: (data) => {
        alert(data.data)
      },
      error: (error: unknown) => console.error(error),
      complete: () => this.cdr.detectChanges(),
    })
  }

  reiniciarFiltros() {
    this.formularioTablaDeMesas.reset()
    this.mesas = this.todasLasMesas
  }
}
