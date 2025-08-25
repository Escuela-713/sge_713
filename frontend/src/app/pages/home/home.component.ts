import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { NavComponent } from 'src/app/shared/nav/nav.component';
import { RouterModule } from '@angular/router';

interface CarouselSlide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}

interface Card {
  id: number;
  slug: string;
  backgroundImage: string;
  title: string;
  description: string;
  location: string;
  date: string;
  locationIcon: string;
  dateIcon: string;
}

interface HomeData {
  carouselSlides: CarouselSlide[];
  sectionTitle: string;
  cards: Card[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavComponent, HeaderComponent, FooterComponent, HttpClientModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  homeData: HomeData | null = null;
  isLoading: boolean = true;
  error: string | null = null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadHomeData();
  }

  private loadHomeData(): void {
    this.http.get<HomeData>('assets/novedades-home.json')
      .subscribe({
        next: (data) => {
          this.homeData = data;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading home data:', error);
          this.error = 'Error al cargar los datos';
          this.isLoading = false;
        }
      });
  }

  // Método para generar números únicos para el carousel
  generateCarouselId(prefix: string, index: number): string {
    return `${prefix}-${index}`;
  }

    // Método trackBy para *ngFor de las cards
    trackByCardId(index: number, card: Card): number {
      return card.id;
    }
}