import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

import { NovedadesService } from '../../../services/novedades.service';
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
  categoria: Categoria;
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

  slideEditando: CarouselSlide | null = null;
  mostrarEditorSlide = false;

  totalSlides = 0;
  totalCards = 0;
  totalCategorias = 0;
  ultimasCards: Card[] = [];
  isLoading = false;
  mostrarTodas = false;

  constructor(private novedadesService: NovedadesService, private router: Router) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  async cargarDatos(): Promise<void> {
    try {
      const data = await this.novedadesService.getAll() as unknown as Partial<NovedadesData>;
      this.novedadesData = {
        carouselSlides: data.carouselSlides ?? [],
        sectionTitle: data.sectionTitle ?? '',
        cards: data.cards ?? []
      };
      this.calcularEstadisticas();
      this.obtenerUltimasCards();
    } catch (err) {
      console.error('Error al cargar los datos:', err);
    }
  }

  onEditarSlide(slide: CarouselSlide): void {
    this.slideEditando = { ...slide };
    this.mostrarEditorSlide = true;
  }

  async onGuardarSlideEditado(slideEditado: CarouselSlide) {
    try {
      await this.novedadesService.updateSlide(slideEditado);
      await this.cargarDatos();
      this.mostrarEditorSlide = false;
      this.slideEditando = null;
      alert('Slide editado correctamente');
    } catch (err) {
      alert('Error al editar el slide');
    }
  }

  onCancelarEdicionSlide() {
    this.mostrarEditorSlide = false;
    this.slideEditando = null;
  }

  async onDeleteCard(card: Card): Promise<void> {
    const ok = confirm('¿Está seguro de querer eliminar esta publicación?');
    if (!ok) return;
    try {
      await this.novedadesService.deleteCardById(card.id);
      await this.cargarDatos();
      alert('Publicación eliminada');
    } catch (err) {
      console.error('Error eliminando card:', err);
      alert('Error al eliminar la publicación');
    }
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

  private calcularEstadisticas(): void {
    this.totalSlides = this.novedadesData.carouselSlides.length;
    this.totalCards = this.novedadesData.cards.length;

    const categoriasUnicas = new Set(
      this.novedadesData.cards.map(card => card.categoria?.id)
    );
    this.totalCategorias = categoriasUnicas.size;
  }

  private obtenerUltimasCards(): void {
    const ordenadas = [...this.novedadesData.cards].sort((a, b) =>
      new Date(b.upload_date).getTime() - new Date(a.upload_date).getTime()
    );
    this.ultimasCards = this.mostrarTodas ? ordenadas : ordenadas.slice(0, 4);
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