import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-gestion-home',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './gestion-home.component.html',
  styleUrls: ['./gestion-home.component.css']
})
export class GestionHomeComponent {
ngOnInit(): void{
  document.title = `Home Dashboard - SGE 713  `
}

}
