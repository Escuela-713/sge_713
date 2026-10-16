import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Location } from "@angular/common";
import { FooterComponent } from "@shared/footer/footer.component";
import { HeaderComponent } from "@shared/header/header.component";
import { Subject, takeUntil, firstValueFrom } from "rxjs";
import { NovedadesService } from "../../services/novedades.service";

interface Novedad {
  id: number;
  title: string;
  content: string;
  image: string;
  categoria: number;
  is_published: boolean;
  upload_date: string;
  update_date: string;
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
   
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      
      const id = Number(params.get("id"));
      if (id) {
        this.loadNovedad(id);
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

  private async loadNovedad(id: number): Promise<void> {
    try {
      
      const card = await firstValueFrom(this.novedadesService.getCardById(id));
      this.novedad = card as unknown as Novedad | undefined;

      if (this.novedad) {
        document.title = `${this.novedad.title} - Novedades`;
      }
    } catch (error) {
      console.error("Error cargando la publicación:", error);
      this.novedad = undefined;
    }
  }
}
