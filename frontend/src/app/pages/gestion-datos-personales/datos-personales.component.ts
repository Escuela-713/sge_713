import { Component } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { DatosPeronalesService } from 'src/app/services/datos-personales.service';

@Component({
  selector: 'app-datos-personales',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css'],
})
export class DatosPersonalesComponent {
  datostutor: any[] = [];
  sinResultados: boolean = false;

  constructor(
    private serviciosge: DatosPeronalesService,
    private route: ActivatedRoute,
  ) {
    this.serviciosge.obtenerdatosTutor().subscribe({
      next: (data) => {
        const { nombreApellido, dni } = this.route.snapshot.queryParams;
        console.log('Query params:', { nombreApellido, dni });
        console.log('Primer alumno del JSON:', data[0]);
        const filtrado = data.filter((alumno: any) => {
          const nombreCompleto =
            `${alumno.nombre} ${alumno.apellido}`.toLowerCase();

          const coincideNombre = nombreApellido
            ? nombreCompleto.includes(nombreApellido.toLowerCase())
            : true;

          const coincideDni = dni ? alumno.dni === dni.trim() : true;

          return coincideNombre && coincideDni;
        });

        this.datostutor = filtrado;
        this.sinResultados = filtrado.length === 0;
      },
      error: (err) => {
        alert('Se ha producido un error. Por favor, intente nuevamente.');
        console.error(err);
      },
    });
  }
}

