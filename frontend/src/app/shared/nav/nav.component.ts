import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isAuthenticated = false;
  currentUser: any = null;

  constructor() { }

  ngOnInit(): void {
    // Check authentication status on init
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
}
