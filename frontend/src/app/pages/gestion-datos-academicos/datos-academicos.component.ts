import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FiltroCalificadorComponent } from './filtro-calificador/filtro-calificador.component';

@Component({
  selector: 'app-datos-academicos',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './datos-academicos.component.html',
  styleUrls: ['./datos-academicos.component.css']
})
export class DatosAcademicosComponent {

}
