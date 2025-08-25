import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { Location } from '@angular/common';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { FooterComponent } from 'src/app/shared/footer/footer.component';

interface Novedad {
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

@Component({
  selector: 'app-novedad',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './novedad.component.html',
  styleUrl: './novedad.component.css'
})
export class NovedadComponent implements OnInit, OnDestroy {
  novedad: Novedad | undefined;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    // Subscribe to route parameter changes
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const slug = params.get('slug');
        if (slug) {
          this.loadNovedad(slug);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  goBack(): void {
    this.location.back();
  }

  private async loadNovedad(slug: string): Promise<void> {
    try {
      const response = await fetch('/assets/novedades-home.json');
      if (!response.ok) {
        throw new Error('Error al cargar las novedades');
      }
      
      const data = await response.json();
      this.novedad = data.cards?.find((card: Novedad) => card.slug === slug);
      
      // Set page title if novedad is found
      if (this.novedad) {
        document.title = `${this.novedad.title} - Novedades`;
      }
    } catch (error) {
      console.error('Error loading novedad:', error);
      this.novedad = undefined;
    }
  }
}