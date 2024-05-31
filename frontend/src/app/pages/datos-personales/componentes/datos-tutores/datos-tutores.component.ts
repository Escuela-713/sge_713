import { Component } from '@angular/core';
import { SgeService } from 'src/app/sge-service/sge.service';
@Component({
  selector: 'app-datos-tutores',
  templateUrl: './datos-tutores.component.html',
  styleUrls: ['./datos-tutores.component.css']
})
export class DatosTutoresComponent {

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