import { Component } from '@angular/core';
import { MateriasService } from '../../../services/materias.service'
import { CarrerasService } from '../../../services/carreras.service'

@Component({
  selector: 'app-creacion-de-mesa',
  imports: [],
  templateUrl: './creacion-de-mesa.component.html',
  styleUrl: './creacion-de-mesa.component.css'
})
export class CreacionDeMesaComponent {
  materias: any = []
  carreras: any = []

  constructor (private servicioMateria: MateriasService, private servicioCarrera: CarrerasService) {
    servicioMateria.obtenerMaterias().subscribe({
      next: (data) => {
        this.materias = data
      },
      error: (error) => {
        console.error(error)
      },
      complete: () => {}
    })

    servicioCarrera.obtenerCarreras().subscribe({
      next: (data) => {
        this.carreras = data
      },
      error: (error) => {
        console.error(error)
      },
      complete: () => {}
    })
  }


}
