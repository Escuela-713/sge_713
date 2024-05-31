import { Component, OnInit } from '@angular/core';
import { SgeService } from 'src/app/sge-service/sge.service';
@Component({
  selector: 'app-datos-escolares',
  templateUrl: './datos-escolares.component.html',
  styleUrls: ['./datos-escolares.component.css']
})
export class DatosEscolaresComponent {

  datostutor: any;
  constructor(private serviciosge: SgeService) {
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
