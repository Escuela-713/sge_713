import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mostrar-formularios',
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
