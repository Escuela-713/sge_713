import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { FooterComponent } from "@shared/footer/footer.component";
import { HeaderComponent } from "@shared/header/header.component";
import { NavComponent } from "@shared/nav/nav.component";

@Component({
  selector: "app-tabla-mesa-examen",
  templateUrl: "./mesas-index.html",
  imports: [RouterOutlet, HeaderComponent, NavComponent, FooterComponent],
})
export class MesasIndexComponent {}
