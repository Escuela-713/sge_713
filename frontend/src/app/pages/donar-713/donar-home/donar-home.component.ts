import { Component } from '@angular/core';
import { CarrouselComponent } from "../componentes/carrousel/carrousel.component";
import { EventosComponent } from "../componentes/eventos/eventos.component";
import { NoticiasComponent } from "../componentes/noticias/noticias.component";
import { InformacionComponent } from "../componentes/informacion/informacion.component";

@Component({
  selector: 'app-donar-home',
  imports: [CarrouselComponent, NoticiasComponent, EventosComponent, InformacionComponent],
  templateUrl: './donar-home.component.html',
  styleUrl: './donar-home.component.css',
})
export class DonarHomeComponent {

}
