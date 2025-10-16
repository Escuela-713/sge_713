import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-registro-mesa-examen',
  imports: [RouterLink],
  templateUrl: './registro-mesa-examen.component.html',
  styleUrl: './registro-mesa-examen.component.css'
})
export class RegistroMesaExamenComponent {
  fecha: string = new Date().toLocaleString();

}
