import { Component } from '@angular/core';

@Component({
  selector: 'app-registro-mesa-examen',
  imports: [],
  templateUrl: './registro-mesa-examen.component.html',
  styleUrl: './registro-mesa-examen.component.css'
})
export class RegistroMesaExamenComponent {
  fecha: string = new Date().toLocaleString();

}
