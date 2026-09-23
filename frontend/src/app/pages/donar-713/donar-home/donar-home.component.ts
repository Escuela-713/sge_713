import { Component } from '@angular/core';
import { CarrouselComponent } from "../componentes/carrousel/carrousel.component";
import { EventosComponent } from "../componentes/eventos/eventos.component";

@Component({
  selector: 'app-donar-home',
  imports: [CarrouselComponent, EventosComponent],
  templateUrl: './donar-home.component.html',
  styleUrl: './donar-home.component.css',
})
export class DonarHomeComponent {

}
