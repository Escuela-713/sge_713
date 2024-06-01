import { Component, OnInit } from '@angular/core';

import { NgIf } from '@angular/common';
import { DatosEscolaresComponent } from '../componentes/datos-escolares/datos-escolares.component';
import { DatosIdentidadComponent } from '../componentes/datos-identidad/datos-identidad.component';
import { DatosTutoresComponent } from '../componentes/datos-tutores/datos-tutores.component';
import { DatosLocalidadComponent } from '../componentes/datos-localidad/datos-localidad.component';
import { DatosDomicilioComponent } from '../componentes/datos-domicilio/datos-domicilio.component';

@Component({
  selector: 'app-mostrar-formularios',
  standalone: true,
  imports: [DatosEscolaresComponent, DatosIdentidadComponent, DatosTutoresComponent, DatosLocalidadComponent, DatosDomicilioComponent, NgIf],
  templateUrl: './mostrar-formularios.component.html',
  styleUrls: ['./mostrar-formularios.component.css']
})
export class MostrarFormulariosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  componenteVisible = 'datosAlumno';

  mostrarComponente(componente: string) {
    this.componenteVisible = componente;
  }

}
