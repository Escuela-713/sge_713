import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { NavComponent } from 'src/app/shared/nav/nav.component';

@Component({
  selector: 'app-tabla-mesa-examen',
  templateUrl: './mesas-index.html',
  imports: [RouterOutlet, HeaderComponent, NavComponent, FooterComponent],
})
export class MesasIndexComponent {}
