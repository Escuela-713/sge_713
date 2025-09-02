import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-gestion-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './gestion-home.component.html',
  styleUrls: ['./gestion-home.component.css']
})
export class GestionHomeComponent {
ngOnInit(): void{
  document.title = `Home Dashboard - SGE 713  `
}

}
