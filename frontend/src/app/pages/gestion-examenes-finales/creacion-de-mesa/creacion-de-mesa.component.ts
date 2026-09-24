import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core'
import { CarrerasService } from '@services/carreras.service'
import { MateriasService } from '@services/materias.service'
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms'
import { MesasExamenesService } from '@/app/services/mesas-examenes.service'
import { Mesa } from '@/app/models/mesas-examenes.model'

@Component({
  selector: 'app-creacion-de-mesa',
  imports: [ReactiveFormsModule],
  templateUrl: './creacion-de-mesa.component.html',
  styleUrl: './creacion-de-mesa.component.css',
})
export class CreacionDeMesaComponent implements OnInit {
  private servicioMateria = inject(MateriasService)
  private servicioCarrera = inject(CarrerasService)
  private fb = inject(FormBuilder)
  private cdr = inject(ChangeDetectorRef)
  private servicioMesas = inject(MesasExamenesService)

  materias: any = []
  carreras: any = []
  cursos = [1, 2, 3, 4, 5, 6, 7]

  ngOnInit(): void {
    this.servicioMateria.obtenerMaterias().subscribe({
      next: (data) => {
        this.materias = data
      },
      error: (error) => {
        console.error(error)
      },
      complete: () => this.cdr.detectChanges(),
    })

    this.servicioCarrera.obtenerCarreras().subscribe({
      next: (data) => {
        this.carreras = data
      },
      error: (error) => {
        console.error(error)
      },
      complete: () => this.cdr.detectChanges(),
    })
  }

  formularioMesaExamen = this.fb.group({
    ano: ['', [Validators.required, Validators.min(1), Validators.max(7)]],
    carrera: ['', [Validators.required]],
    materia: ['', [Validators.required]],
    profesor_titular: ['', [Validators.required, Validators.minLength(3)]],
    profesor_primer_vocal: ['', [Validators.required, Validators.minLength(3)]],
    profesor_segundo_vocal: ['', [Validators.required, Validators.minLength(3)]],
    fecha: ['', [Validators.required]],
    turno: ['', [Validators.required]],
  })

  subirMesa() {
    if (!this.formularioMesaExamen.valid) return console.error(this.formularioMesaExamen.errors)

    this.servicioMesas.subirMesa(this.formularioMesaExamen.value as unknown as Mesa)
  }
}
