import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  currentUser: any = null;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.checkAuth();
  }

  checkAuth(): void {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      this.isAuthenticated = true;
      this.currentUser = JSON.parse(userData);
    } else {
      this.isAuthenticated = false;
      this.currentUser = null;
    }
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.isAuthenticated = false;
    this.currentUser = null;
    this.router.navigate(['/']);
  }
}
