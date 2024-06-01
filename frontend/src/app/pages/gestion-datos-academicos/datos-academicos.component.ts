import { Component } from '@angular/core';
import { BuscarEstudianteComponent } from './componentes/buscar-estudiante/buscar-estudiante.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-datos-academicos',
  standalone: true,
  imports: [BuscarEstudianteComponent, RouterOutlet],
  templateUrl: './datos-academicos.component.html',
  styleUrls: ['./datos-academicos.component.css']
})
export class DatosAcademicosComponent {

}
