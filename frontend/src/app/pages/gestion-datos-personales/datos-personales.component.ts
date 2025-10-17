import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatosPeronalesService } from 'src/app/services/datos-personales.service';

@Component({
  selector: 'app-datos-personales',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css'],
})
export class DatosPersonalesComponent {
  datostutor: any;
  nombre: string = 'hola';
  constructor(private serviciosge: DatosPeronalesService) {
    this.serviciosge.obtenerdatosTutor().subscribe({
      next: (data) => {
        this.datostutor = data;
      },
      error: (err) => {
        alert('Se ha producido un error. Por favor, intente nuevamente.');
        console.error(err);
      },
    });
  }
}
