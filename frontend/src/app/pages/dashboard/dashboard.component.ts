import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { NavComponent } from 'src/app/shared/nav/nav.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavComponent,RouterOutlet,FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
