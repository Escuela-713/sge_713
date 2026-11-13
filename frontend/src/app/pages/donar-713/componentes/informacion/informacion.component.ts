import { Component, OnInit } from '@angular/core';
import { DonarService, InformacionApi } from '../../../../services/donar.service';

@Component({
  selector: 'app-informacion',
  imports: [],
  templateUrl: './informacion.component.html',
  styleUrl: './informacion.component.css',
})
export class InformacionComponent implements OnInit {
  requisitos: InformacionApi[] = [];
  preguntas: InformacionApi[] = [];
  preguntaAbierta: number | null = null;

  constructor(private donarService: DonarService) {}

  ngOnInit(): void {
    this.donarService.getHomeData().subscribe({
      next: (data) => {
        const items = data.informacion || [];
        this.requisitos = items.filter((i) => i.tipo === 'requisito');
        this.preguntas = items.filter((i) => i.tipo === 'pregunta');
      },
      error: () => {
        this.requisitos = [];
        this.preguntas = [];
      },
    });
  }

  alternarPregunta(id: number): void {
    this.preguntaAbierta = this.preguntaAbierta === id ? null : id;
  }
}
