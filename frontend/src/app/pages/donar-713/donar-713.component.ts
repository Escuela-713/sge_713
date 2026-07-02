import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
 import { CarrouselComponent } from "../donar-713/componentes/carrousel/carrousel.component";
 import {  } from "../donar-713/componentes/eventos/eventos.component";
@Component({
  selector: 'app-donar-713',
  imports: [RouterLink,CarrouselComponent,RouterOutlet],
  templateUrl: './donar-713.component.html',
  styleUrl: './donar-713.component.css',
})
export class Donar713Component {

}
