import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TutoresService } from 'src/app/services/tutores.service';


@Component({
  selector: 'app-datos-tutores',
  standalone: true,
  imports: [RouterLink, NgFor],
  templateUrl: './datos-tutores.component.html',
  styleUrls: ['./datos-tutores.component.css'],
})
export class DatosTutoresComponent {
  datostutor: any;
  nombre: string = 'hola';
  constructor(private serviciosge: TutoresService) {
    this.serviciosge.obtenerdatosTutor().subscribe({
      next: (data) => {

        this.datostutor = data["tutor"];
        console.log(data)
      },
      error: (err) => {
        alert('Se ha producido un error. Por favor, intente nuevamente.');
        console.error(err);
      },
    });
  }
}