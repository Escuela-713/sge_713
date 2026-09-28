import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core'
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms'
import { CarrerasService } from '@services/carreras.service'
import { MateriasService } from '@services/materias.service'
import { MesasExamenesService } from '@services/mesas-examenes.service'
import { Carrera, Materia, Mesa } from '@models/mesas-examenes.model'
import { environment } from '@/environments/environment.development'

@Component({
  selector: 'app-creacion-de-mesa',
  imports: [ReactiveFormsModule],
  templateUrl: './creacion-de-mesa.component.html',
})
export class CreacionDeMesaComponent implements OnInit {
  private servicioMateria = inject(MateriasService)
  private servicioCarrera = inject(CarrerasService)
  private fb = inject(FormBuilder)
  private cdr = inject(ChangeDetectorRef)
  private servicioMesas = inject(MesasExamenesService)

  materias: Materia[] = []
  carreras: Carrera[] = []
  anos = environment.anos

  ngOnInit(): void {
    this.servicioMateria.obtenerMaterias().subscribe({
      next: (materias) => {
        this.materias = materias.data
      },
      error: (error) => {
        console.error(error)
      },
      complete: () => this.cdr.detectChanges(),
    })

    this.servicioCarrera.obtenerCarreras().subscribe({
      next: (carreras) => {
        this.carreras = carreras.data
      },
      error: (error) => {
        console.error(error)
      },
      complete: () => this.cdr.detectChanges(),
    })
  }

  formularioMesaExamen = this.fb.group({
    ano: ['', [Validators.required, Validators.min(1), Validators.max(7)]],
    id_carrera: ['', [Validators.required]],
    id_materia: ['', [Validators.required]],
    profesor_titular: ['', [Validators.required, Validators.minLength(10)]],
    profesor_primer_vocal: ['', [Validators.required, Validators.minLength(10)]],
    profesor_segundo_vocal: [
      '',
      [Validators.required, Validators.minLength(10)],
    ],
    dia: ['', [Validators.required]],
    hora: ['', [Validators.required]],
  })

  get Ano() {
    return this.formularioMesaExamen.get('ano') as AbstractControl
  }

  get Carrera() {
    return this.formularioMesaExamen.get('carrera') as AbstractControl
  }

  get Materia() {
    return this.formularioMesaExamen.get('materia') as AbstractControl
  }

  get ProfesorTitular() {
    return this.formularioMesaExamen.get('profesor_titular') as AbstractControl
  }

  get ProfesorPrimerVocal() {
    return this.formularioMesaExamen.get(
      'profesor_primer_vocal',
    ) as AbstractControl
  }

  get ProfesorSegundoVocal() {
    return this.formularioMesaExamen.get(
      'profesor_segundo_vocal',
    ) as AbstractControl
  }

  get Dia() {
    return this.formularioMesaExamen.get('dia') as AbstractControl
  }

  get Hora() {
    return this.formularioMesaExamen.get('hora') as AbstractControl
  }

  subirMesa() {
    if (!this.formularioMesaExamen.valid)
      return console.error(this.formularioMesaExamen.errors)

    this.servicioMesas
      .subirMesa(this.formularioMesaExamen.value as unknown as Mesa)
      .subscribe({
        next: (data) => {
          console.log(data)
          alert(data.data)
        },
        error: (error) => {
          const errores = error.error.message
          if (Array.isArray(errores)) return alert(Object.values(errores).join(' '))

          alert(errores)
        },
        complete: () => {
          this.formularioMesaExamen.reset()
        },
      })
  }
}
