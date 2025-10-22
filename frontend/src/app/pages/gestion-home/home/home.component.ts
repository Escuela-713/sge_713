import { Component, OnInit } from '@angular/core';
import {RouterLink} from '@angular/router'
import { NovedadesService, NovedadesData, Card } from '../../../services/novedades.service';

export interface CarouselSlide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}
// Card and NovedadesData types are declared in the service to avoid duplication

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
  isLoading = false;
  mostrarTodas = false;

  constructor(private novedadesService: NovedadesService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  async cargarDatos(): Promise<void> {
    try {
      // Como cargamos desde localStorage, no necesitamos mostrar loading
      this.novedadesData = await this.novedadesService.getAll();
      this.calcularEstadisticas();
      this.obtenerUltimasCards();
    } catch (err) {
      console.error('Error al cargar los datos:', err);
    }
  }

  async onDeleteCard(card: Card): Promise<void> {
    const ok = confirm(`¿Eliminar posteo "${card.title}"? Esta acción no se puede deshacer.`);
    if (!ok) return;
    try {
      await this.novedadesService.deleteCardById(card.id);
      await this.cargarDatos();
      alert('Posteo eliminado');
    } catch (err) {
      console.error('Error eliminando card:', err);
      alert('Error al eliminar el posteo');
    }
  }

  private calcularEstadisticas(): void {
    this.totalSlides = this.novedadesData.carouselSlides.length;
    this.totalCards = this.novedadesData.cards.length;
    
    // Contar ubicaciones únicas
    const ubicacionesUnicas = new Set(this.novedadesData.cards.map(card => card.location));
    this.totalLocaciones = ubicacionesUnicas.size;
  }

  private obtenerUltimasCards(): void {
    // Ordenar por fecha (más recientes primero)
    const ordenadas = this.novedadesData.cards.sort((a, b) => {
      const dateA = this.parsearFecha(a.date);
      const dateB = this.parsearFecha(b.date);
      return dateB.getTime() - dateA.getTime();
    });
    
    // Si mostrarTodas es true, mostrar todas las cards ordenadas
    this.ultimasCards = this.mostrarTodas ? ordenadas : ordenadas.slice(0, 4);
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

  mostrarTodasLasNovedades(): void {
    this.mostrarTodas = !this.mostrarTodas;
    this.obtenerUltimasCards();
  }

  async onDeleteSlide(slide: CarouselSlide): Promise<void> {
    const ok = confirm(`¿Eliminar slide "${slide.title}"? Esta acción no se puede deshacer.`);
    if (!ok) return;
    try {
      await this.novedadesService.deleteSlideById(slide.id);
      await this.cargarDatos();
      alert('Slide eliminado correctamente');
    } catch (err) {
      console.error('Error eliminando slide:', err);
      alert('Error al eliminar el slide');
    }
  }
}