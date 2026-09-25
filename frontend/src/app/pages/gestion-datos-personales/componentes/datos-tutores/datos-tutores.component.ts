import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { TutoresService } from "@services/tutores.service";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: "app-datos-tutores",
  standalone: true,
  imports: [RouterLink],
  templateUrl: "./datos-tutores.component.html",
  styleUrls: ["./datos-tutores.component.css"],
})
export class DatosTutoresComponent {
  datostutor: any;
  nombre: string = "hola";
  constructor(private serviciosge: TutoresService) {
    this.serviciosge.obtenerdatosTutor().subscribe({
      next: (data) => {
        this.datostutor = data["tutor"];
        console.log(data);
      },
    error: (err: HttpErrorResponse) => {
      console.error(err);

      if (err.status === 400) {
        alert('La solicitud no es válida. Verifique los datos ingresados.');
      } else if (err.status === 500) {
        alert('Ocurrió un error interno del servidor. Intente nuevamente más tarde.');
      } else {
        alert('Se ha producido un error. Por favor, intente nuevamente.');
      }
    },
    });
  }
}
