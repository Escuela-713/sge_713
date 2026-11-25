import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { forkJoin } from 'rxjs';

import { NovedadesService } from '../../../services/novedades.service';
import { CategoriasService } from '../../../services/categorias.service';

declare var bootstrap: any;

interface Categoria {
  id: number;
  title: string;
}

interface Card {
  id: number;
  title: string;
  content: string;
  image: string;
  categoria: number;
  is_published: boolean;
  upload_date: string;
  update_date: string;
}

export interface CarouselSlide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
}

interface NovedadesData {
  carouselSlides: CarouselSlide[];
  sectionTitle: string;
  cards: Card[];
}

@Component({
  selector: 'app-dashboard-home',
  imports: [RouterLink],
  standalone: true,
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.css']
})
export class HomeDashboardComponent implements OnInit, AfterViewInit {

  novedadesData: NovedadesData = {
    carouselSlides: [],
    sectionTitle: '',
    cards: []
  };

  categorias: Categoria[] = [];

  totalSlides = 0;
  totalCards = 0;
  totalCategorias = 0;
  ultimasCards: Card[] = [];
  isLoading = false;
  mostrarTodas = false;

  selectedCard: Card | null = null;

  @ViewChild('deleteModal') deleteModalElement!: ElementRef;
  private modalInstance: any;

  constructor(
    private novedadesService: NovedadesService,
    private categoriasService: CategoriasService,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    if (this.deleteModalElement) {
      this.modalInstance = new bootstrap.Modal(this.deleteModalElement.nativeElement);
    }
  }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.isLoading = true;

    forkJoin({
      data: this.novedadesService.getAll(),
      categorias: this.categoriasService.obtenerCategorias(),
    }).subscribe({
      next: ({ data, categorias }) => {
        this.categorias = categorias;
        this.novedadesData = {
          carouselSlides: data.carouselSlides ?? [],
          sectionTitle: data.sectionTitle ?? '',
          cards: (data.cards as unknown as Card[]) ?? []
        };
        this.calcularEstadisticas();
        this.obtenerUltimasCards();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar los datos:', err);
        this.isLoading = false;
      }
    });
  }

  onDeleteCard(card: Card): void {
    this.selectedCard = card;
    if (this.modalInstance) {
      this.modalInstance.show();
    }
  }

  confirmDeleteCard(): void {
    if (!this.selectedCard) return;

    const cardId = this.selectedCard.id;

    if (this.modalInstance) {
      this.modalInstance.hide();
    }

    this.novedadesService.deleteCardById(cardId).subscribe({
      next: () => {
        this.cargarDatos();
        alert('Publicación eliminada');
        this.selectedCard = null;
      },
      error: (err) => {
        console.error('Error eliminando card:', err);
        alert('Error al eliminar la publicación');
      }
    });  
  }

  onDeleteSlide(slide: CarouselSlide): void {
    const ok = confirm(`¿Eliminar slide "${slide.title}"? Esta acción no se puede deshacer.`);
    if (!ok) return;

    this.novedadesService.deleteSlideById(slide.id).subscribe({
      next: () => {
        this.cargarDatos();
        alert('Slide eliminado correctamente');
      },
      error: (err) => {
        console.error('Error eliminando slide:', err);
        alert('Error al eliminar el slide');
      }
    });
  }

  private calcularEstadisticas(): void {
    this.totalSlides = this.novedadesData.carouselSlides.length;
    this.totalCards = this.novedadesData.cards.length;

    const categoriasUnicas = new Set(
      this.novedadesData.cards.map(card => card.categoria)
    );
    this.totalCategorias = categoriasUnicas.size;
  }

  private obtenerUltimasCards(): void {
    const ordenadas = [...this.novedadesData.cards].sort((a, b) =>
      new Date(b.upload_date).getTime() - new Date(a.upload_date).getTime()
    );
    this.ultimasCards = this.mostrarTodas ? ordenadas : ordenadas.slice(0, 4);
  }

  getCategoriaTitle(categoriaId: number): string {
    return this.categorias.find(c => c.id === categoriaId)?.title ?? 'Sin categoría';
  }

  formatearFecha(fecha: string): string {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  truncarTexto(texto: string, limite: number = 100): string {
    return texto.length > limite ? texto.substring(0, limite) + '...' : texto;
  }

  mostrarTodasLasNovedades(): void {
    this.mostrarTodas = !this.mostrarTodas;
    this.obtenerUltimasCards();
  }

  agregarNovedad(): void {
    this.router.navigate(['/dashboard/home/agregar-novedad']);
  }
}