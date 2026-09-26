import { Component, OnInit } from "@angular/core";

import { RouterModule } from "@angular/router";
import { FooterComponent } from "@shared/footer/footer.component";
import { HeaderComponent } from "@shared/header/header.component";
import { NavComponent } from "@shared/nav/nav.component";
import { NovedadesService, Publication, NovedadesData } from "@/app/services/novedades.service";
import { DatePipe, SlicePipe } from "@angular/common";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [
    NavComponent,
    HeaderComponent,
    FooterComponent,
    RouterModule,
    SlicePipe,
    DatePipe,
  ],
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  homeData: NovedadesData | null = null;
  isLoading: boolean = true;
  error: string | null = null;

  constructor(private readonly publicationService: NovedadesService) {}

  ngOnInit(): void {
    this.loadHomeData();
    // Poner como titulo "Escuela 713 - Home" para que no se cargue SGE 713
    document.title = `Escuela 713 - Home`;
  }

  private async loadHomeData(): Promise<void> {
    try {
      this.homeData = await this.publicationService.getAll();
      this.isLoading = false;
    } catch (error) {
      console.error("Error loading home data:", error);
      this.error = "Error al cargar los datos";
      this.isLoading = false;
    }
  }

  // Método para generar números únicos para el carousel
  generateCarouselId(prefix: string, index: number): string {
    return `${prefix}-${index}`;
  }

  // Método trackBy para @for de las cards
  trackByCardId(index: number, card: Publication): number {
    return card.id;
  }
}