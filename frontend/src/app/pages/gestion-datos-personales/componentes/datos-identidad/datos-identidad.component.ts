import { Component, OnInit } from '@angular/core';
import { DatosPeronalesService } from 'src/app/service/datos-personales.service';

@Component({
  selector: 'app-datos-identidad',
  standalone: true,
  imports: [],
  templateUrl: './datos-identidad.component.html',
  styleUrls: ['./datos-identidad.component.css']
})
export class DatosIdentidadComponent {

  datostutor: any;
  constructor(private serviciosge: DatosPeronalesService) {
    this.serviciosge.obtenerdatosTutor().subscribe(
      {
        next: (data) => {
          this.datostutor = data["datosTutor"];
          console.log("datosTutor");
          console.log(this.datostutor);
        },
        error: (err) => {
          alert("Se ha producido un error. Por favor, intente nuevamente.");
          console.error(err)
        }
      }
    )
  }
}