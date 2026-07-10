import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { FooterComponent } from "@shared/footer/footer.component";
import { HeaderComponent } from "@shared/header/header.component";
import { NavComponent } from "@shared/nav/nav.component";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [NavComponent, RouterOutlet, FooterComponent, HeaderComponent],
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
