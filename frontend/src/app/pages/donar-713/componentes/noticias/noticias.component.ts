import { Component, OnInit } from '@angular/core';
import { DonarService, NoticiaApi } from '../../../../services/donar.service';

const MESES_ABREVIADOS = [
  'ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN',
  'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC',
];

@Component({
  selector: 'app-noticias',
  imports: [],
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.css',
})
export class NoticiasComponent implements OnInit {
  noticias: NoticiaApi[] = [];

  constructor(private donarService: DonarService) {}

  ngOnInit(): void {
    this.donarService.getHomeData().subscribe({
      next: (data) => (this.noticias = data.noticias || []),
      error: () => (this.noticias = []),
    });
  }

  formatearFecha(fecha: string): string {
    const iso = fecha.match(/^(\d{4})-(\d{2})-(\d{2})/);
    return iso ? `${iso[3]}/${iso[2]}/${iso[1]}` : fecha;
  }

  obtenerDia(fecha: string): string {
    const iso = fecha.match(/^\d{4}-\d{2}-(\d{2})/);
    return iso ? String(Number(iso[1])) : '';
  }

  obtenerMes(fecha: string): string {
    const iso = fecha.match(/^\d{4}-(\d{2})-\d{2}/);
    return iso ? MESES_ABREVIADOS[Number(iso[1]) - 1] ?? '' : '';
  }
}
