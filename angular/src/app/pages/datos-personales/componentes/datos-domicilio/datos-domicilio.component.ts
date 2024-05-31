import { Component, } from '@angular/core';
import { SgeService } from 'src/app/sge-service/sge.service';
@Component({
  selector: 'app-datos-domicilio',
  templateUrl: './datos-domicilio.component.html',
  styleUrls: ['./datos-domicilio.component.css']
})
export class DatosDomicilioComponent {

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