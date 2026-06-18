
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatosPeronalesService } from 'src/app/services/datos-personales.service';

@Component({
  selector: 'app-datos-personales',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css'],
})
export class DatosPersonalesComponent {
  datostutor: any;
  nombre: string = 'hola';
  sinResultados: boolean = false;

  constructor(private serviciosge: DatosPeronalesService,
    private route: ActivatedRoute
  ) 
  {
    this.serviciosge.obtenerdatosTutor().subscribe({
      next: (data) => {
        this.datostutor = data;
        const params = this.route.snapshot.queryParams;
        const cursoBuscado = `${params['curso']} ${params['modalidad']}`;

        const filtrado = data.filter((alumno: any) =>
          alumno.curso === cursoBuscado
        );
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
