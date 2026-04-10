import { Component, OnInit } from '@angular/core';


import { DatosEscolaresComponent } from '../componentes/datos-escolares/datos-escolares.component';
import { DatosIdentidadComponent } from '../componentes/datos-identidad/datos-identidad.component';
import { DatosTutoresComponent } from '../componentes/datos-tutores/datos-tutores.component';

@Component({
  selector: 'app-mostrar-formularios',
  standalone: true,
  imports: [DatosEscolaresComponent, DatosIdentidadComponent, DatosTutoresComponent],
  templateUrl: './editar-datos-personales.component.html',
  styleUrls: ['./editar-datos-personales.component.css']
})
export class EditarDatosPersonalesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  componenteVisible = 'datosAlumno';

  mostrarComponente(componente: string) {
    this.componenteVisible = componente;
  }

}
