import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
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
import { ActivatedRoute } from '@angular/router';

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
  mesaSeleccionada: Mesa | null = null


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

    this.servicioMesas.obtenerMesas().subscribe({
      next: (mesas) => {
        if (Number.isNaN(Number(this.idMesa))) {
          return
        }

        this.mesaSeleccionada = mesas.data.find((mesa) => mesa.id_mesa_examen === Number(this.idMesa)) ?? null
      },
      error: (error) => {
        console.error(error)
      },
      complete: () => this.cdr.detectChanges(),
    })
  }

  formularioDeEdicion = this.fb.group({
    ano: [this.mesaSeleccionada?.ano, [Validators.required, Validators.min(1), Validators.max(7)]],
    id_carrera: [this.mesaSeleccionada?.carrera, [Validators.required]],
    id_materia: [this.mesaSeleccionada?.materia, [Validators.required]],
    profesor_titular: [this.mesaSeleccionada?.profesor_titular, [Validators.required, Validators.minLength(10)]],
    profesor_primer_vocal: [this.mesaSeleccionada?.profesor_primer_vocal, [Validators.required, Validators.minLength(10)]],
    profesor_segundo_vocal: [
      this.mesaSeleccionada?.profesor_segundo_vocal,
      [Validators.required, Validators.minLength(10)],
    ],
    dia: [this.mesaSeleccionada?.dia, [Validators.required]],
    hora: [this.mesaSeleccionada?.hora, [Validators.required]],
  })


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

  guardarEdicion() {

  }
}
