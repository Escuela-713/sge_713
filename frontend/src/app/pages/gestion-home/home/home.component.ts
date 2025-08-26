import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {RouterLink} from '@angular/router'
import { Observable } from 'rxjs';

export interface CarouselSlide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}

export interface Card {
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

export interface NovedadesData {
  carouselSlides: CarouselSlide[];
  sectionTitle: string;
  cards: Card[];
}

@Component({
  selector: 'app-dashboard-home',
  imports: [RouterLink],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeGestionComponent implements OnInit {
  
  novedadesData: NovedadesData = { 
    carouselSlides: [], 
    sectionTitle: '', 
    cards: [] 
  };
  
  totalSlides = 0;
  totalCards = 0;
  totalLocaciones = 0;
  ultimasCards: Card[] = [];
  isLoading = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.http.get<NovedadesData>('assets/novedades-home.json')
      .subscribe({
        next: (data) => {
          this.novedadesData = data;
          this.calcularEstadisticas();
          this.obtenerUltimasCards();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error al cargar los datos:', error);
          this.isLoading = false;
        }
      });
  }

  private calcularEstadisticas(): void {
    this.totalSlides = this.novedadesData.carouselSlides.length;
    this.totalCards = this.novedadesData.cards.length;
    
    // Contar ubicaciones únicas
    const ubicacionesUnicas = new Set(this.novedadesData.cards.map(card => card.location));
    this.totalLocaciones = ubicacionesUnicas.size;
  }

  private obtenerUltimasCards(): void {
    // Ordenar por fecha (más recientes primero) y tomar las últimas 4
    this.ultimasCards = this.novedadesData.cards
      .sort((a, b) => {
        const dateA = this.parsearFecha(a.date);
        const dateB = this.parsearFecha(b.date);
        return dateB.getTime() - dateA.getTime();
      })
      .slice(0, 4);
  }

  private parsearFecha(fechaStr: string): Date {
    // Manejar diferentes formatos de fecha
    if (fechaStr.includes('/')) {
      const partes = fechaStr.split('/');
      if (partes.length === 2) {
        // Formato MM/YYYY
        return new Date(parseInt(partes[1]), parseInt(partes[0]) - 1, 1);
      } else if (partes.length === 3) {
        // Formato DD/MM/YYYY
        return new Date(parseInt(partes[2]), parseInt(partes[1]) - 1, parseInt(partes[0]));
      }
    }
    return new Date(fechaStr);
  }

  formatearFecha(fecha: string): string {
    const date = this.parsearFecha(fecha);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  truncarTexto(texto: string, limite: number = 100): string {
    return texto.length > limite ? texto.substring(0, limite) + '...' : texto;
  }

  getIconSvg(iconPath: string): string {
    return `<svg width="20" height="20" viewBox="0 0 512 512" fill="currentColor"><path d="${iconPath}"/></svg>`;
  }
}