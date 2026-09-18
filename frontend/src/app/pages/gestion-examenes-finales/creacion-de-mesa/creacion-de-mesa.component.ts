import { Component, inject, OnInit } from '@angular/core'
import { CarrerasService } from '@services/carreras.service'
import { MateriasService } from '@services/materias.service'

@Component({
  selector: 'app-creacion-de-mesa',
  imports: [],
  templateUrl: './creacion-de-mesa.component.html',
  styleUrl: './creacion-de-mesa.component.css',
})
export class CreacionDeMesaComponent implements OnInit {
  private servicioMateria = inject(MateriasService)
  private servicioCarrera = inject(CarrerasService)

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
      complete: () => {},
    })

    this.servicioCarrera.obtenerCarreras().subscribe({
      next: (data) => {
        this.carreras = data
      },
      error: (error) => {
        console.error(error)
      },
      complete: () => {},
    })
  }
}
