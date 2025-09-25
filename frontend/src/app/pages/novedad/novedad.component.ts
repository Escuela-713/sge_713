import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { Location } from '@angular/common';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { NovedadesService } from '../../service/novedades.service';

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
    private location: Location,
    private novedadesService: NovedadesService
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
      const card = await this.novedadesService.getCardBySlug(slug);
      this.novedad = card as Novedad | undefined;

      if (this.novedad) {
        document.title = `${this.novedad.title} - Novedades`;
      }
    } catch (error) {
      console.error('Error loading novedad:', error);
      this.novedad = undefined;
    }
  }
}