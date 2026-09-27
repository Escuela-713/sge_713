import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { forkJoin } from 'rxjs';

import { NovedadesService } from '../../../services/novedades.service';
import { CategoriasService } from '../../../services/categorias.service';
import { EditarSlideComponent } from '../editar-slide/editar-slide.component';

interface Categoria {
  id: number;
  title: string;
}

interface Card {
  id: number;
  title: string;
  content: string;
  image: string;
  categoria: number; // el backend devuelve el ID, no el objeto completo
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
  imports: [RouterLink, EditarSlideComponent],
  standalone: true,
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.css']
})
export class HomeDashboardComponent implements OnInit {

  novedadesData: NovedadesData = {
    carouselSlides: [],
    sectionTitle: '',
    cards: []
  };

  categorias: Categoria[] = [];

  slideEditando: CarouselSlide | null = null;
  mostrarEditorSlide = false;

  totalSlides = 0;
  totalCards = 0;
  totalCategorias = 0;
  ultimasCards: Card[] = [];
  isLoading = false;
  mostrarTodas = false;

  constructor(
    private novedadesService: NovedadesService,
    private categoriasService: CategoriasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.isLoading = true;

    // Se piden en paralelo: los datos del home y las categorías (para resolver los nombres)
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

  onEditarSlide(slide: CarouselSlide): void {
    this.slideEditando = { ...slide };
    this.mostrarEditorSlide = true;
  }

  onGuardarSlideEditado(slideEditado: CarouselSlide): void {
    this.novedadesService.updateSlide(slideEditado).subscribe({
      next: () => {
        this.cargarDatos();
        this.mostrarEditorSlide = false;
        this.slideEditando = null;
        alert('Slide editado correctamente');
      },
      error: (err) => {
        console.error('Error al editar el slide:', err);
        alert('Error al editar el slide');
      }
    });
  }

  onCancelarEdicionSlide(): void {
    this.mostrarEditorSlide = false;
    this.slideEditando = null;
  }

  onDeleteCard(card: Card): void {
    const ok = confirm('¿Está seguro de querer eliminar esta publicación?');
    if (!ok) return;

    this.novedadesService.deleteCardById(card.id).subscribe({
      next: () => {
        this.cargarDatos();
        alert('Publicación eliminada');
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

  // Resuelve el nombre de la categoría a partir del ID, para usar en el template
  // en vez de card.categoria.title (que rompería porque categoria es solo un número)
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