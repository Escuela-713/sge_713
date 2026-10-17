import { FooterComponent } from '@/app/shared/footer/footer.component'
import { HeaderComponent } from '@/app/shared/header/header.component'
import { NavComponent } from '@/app/shared/nav/nav.component'
import { Component, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, NavComponent, FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
