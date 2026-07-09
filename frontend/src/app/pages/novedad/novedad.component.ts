import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Location } from "@angular/common";
import { FooterComponent } from "@shared/footer/footer.component";
import { HeaderComponent } from "@shared/header/header.component";
import { Subject, takeUntil } from "rxjs";
import { NovedadesService } from "../../services/novedades.service";

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
  selector: "app-novedad",
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: "./novedad.component.html",
  styleUrl: "./novedad.component.css",
})
export class NovedadComponent implements OnInit, OnDestroy {
  novedad: Novedad | undefined;
  private destroy$ = new Subject<void>();
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private novedadesService: NovedadesService,
  ) {}

  ngOnInit(): void {
    // Subscribe to route parameter changes
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const slug = params.get("slug");
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
      console.error("Error loading novedad:", error);
      this.novedad = undefined;
    }
  }
}
