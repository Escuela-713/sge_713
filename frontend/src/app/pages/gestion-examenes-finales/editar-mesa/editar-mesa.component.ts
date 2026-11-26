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
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-editar-mesa',
  imports: [ReactiveFormsModule],
  templateUrl: './editar-mesa.component.html',
  styleUrl: './editar-mesa.component.css',
})
export class EditarMesaComponent implements OnInit {
  private servicioMateria = inject(MateriasService)
  private servicioCarrera = inject(CarrerasService)
  private fb = inject(FormBuilder)
  private cdr = inject(ChangeDetectorRef)
  private servicioMesas = inject(MesasExamenesService)
  private ruta = inject(ActivatedRoute)

  materias: Materia[] = []
  carreras: Carrera[] = []
  anos = environment.anos
  idMesa = this.ruta.snapshot.paramMap.get('id_mesa')
  mesaSeleccionada: Mesa | undefined = undefined

  formularioDeEdicion = this.fb.group({
    ano: [
      '',
      [Validators.required, Validators.min(1), Validators.max(7)],
    ],
    id_carrera: ['', [Validators.required]],
    id_materia: ['', [Validators.required]],
    profesor_titular: [
      '',
      [Validators.required, Validators.minLength(10)],
    ],
    profesor_primer_vocal: [
      '',
      [Validators.required, Validators.minLength(10)],
    ],
    profesor_segundo_vocal: [
      '',
      [Validators.required, Validators.minLength(10)],
    ],
    dia: ['', [Validators.required]],
    hora: ['', [Validators.required]],
  })

  ngOnInit(): void {
    this.servicioMateria.obtenerMaterias().subscribe({
      next: (materias) => {
        this.materias = materias.data
      },
      error: (error) => {
        console.error(error)
      },
      complete: () => this.cdr.markForCheck(),
    })

    this.servicioCarrera.obtenerCarreras().subscribe({
      next: (carreras) => {
        this.carreras = carreras.data
      },
      error: (error) => {
        console.error(error)
      },
      complete: () => this.cdr.markForCheck(),
    })

    this.servicioMesas.obtenerMesas().subscribe({
      next: (mesas) => {
        const mesaSeleccionada = mesas.data.find(
          (mesa) => mesa.id_mesa_examen === Number(this.idMesa),
        ) as Mesa
        Object.entries(mesaSeleccionada).forEach((entrada) => {
          const [clave, valor] = entrada

          if (clave === 'carrera') {
            this.formularioDeEdicion.get('id_carrera')?.patchValue(this.carreras.find((carrera) => carrera.nombre === mesaSeleccionada.carrera.nombre)?.id_carrera as unknown as string)
            return
          }

          if (clave === 'materia') {
            this.formularioDeEdicion.get('id_materia')?.patchValue(this.materias.find((materia) => materia.nombre === mesaSeleccionada.materia.nombre)?.id_materia as unknown as string)
            return
          }

          this.formularioDeEdicion.get(clave)?.patchValue(valor)
        })
      },
      error: (error) => {
        console.error(error)
      },
      complete: () => this.cdr.markForCheck(),
    })

  }


  get Ano() {
    return this.formularioDeEdicion.get('ano') as AbstractControl
  }

  get Carrera() {
    return this.formularioDeEdicion.get('carrera') as AbstractControl
  }

  get Materia() {
    return this.formularioDeEdicion.get('materia') as AbstractControl
  }

  get ProfesorTitular() {
    return this.formularioDeEdicion.get('profesor_titular') as AbstractControl
  }

  get ProfesorPrimerVocal() {
    return this.formularioDeEdicion.get(
      'profesor_primer_vocal',
    ) as AbstractControl
  }

  get ProfesorSegundoVocal() {
    return this.formularioDeEdicion.get(
      'profesor_segundo_vocal',
    ) as AbstractControl
  }

  get Dia() {
    return this.formularioDeEdicion.get('dia') as AbstractControl
  }

  get Hora() {
    return this.formularioDeEdicion.get('hora') as AbstractControl
  }
}
