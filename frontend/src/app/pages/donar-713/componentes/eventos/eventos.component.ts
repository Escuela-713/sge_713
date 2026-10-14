import { Component, OnInit } from '@angular/core';
import { DonarService } from '../../../../services/donar.service';

interface Evento {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  horario: string;
  lugar: string;
  imagen: string;
  estado: 'activo' | 'proximo';
}

const MESES_ABREVIADOS: Record<string, string> = {
  enero: 'ENE',
  febrero: 'FEB',
  marzo: 'MAR',
  abril: 'ABR',
  mayo: 'MAY',
  junio: 'JUN',
  julio: 'JUL',
  agosto: 'AGO',
  septiembre: 'SEP',
  octubre: 'OCT',
  noviembre: 'NOV',
  diciembre: 'DIC',
};

const MESES_ABREVIADOS_POR_NUMERO = [
  'ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN',
  'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC',
];

@Component({
  selector: 'app-eventos',
  imports: [],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css',
})
export class EventosComponent implements OnInit {
  // Eventos de ejemplo: se muestran mientras carga el backend o si todavía
  // no se cargó ningún evento desde el panel de administración.
  eventos: Evento[] = [
    {
      id: 1,
      titulo: 'Campaña de donación de sangre',
      descripcion: 'Jornada solidaria organizada por estudiantes de 5to año. Todos los grupos sanguíneos son bienvenidos.',
      fecha: '28 de junio de 2026',
      horario: '09:00 - 17:00',
      lugar: 'Gimnasio Principal',
      imagen: 'https://placehold.co/400x200/e74c3c/white?text=Donación+de+Sangre',
      estado: 'activo'
    },
    {
      id: 2,
      titulo: 'Colecta de útiles escolares',
      descripcion: 'Recolección de materiales escolares para donar a escuelas rurales de la región.',
      fecha: '30 de junio de 2026',
      horario: '10:00 - 18:00',
      lugar: 'Patio Central',
      imagen: 'https://placehold.co/400x200/e67e22/white?text=Útiles+Escolares',
      estado: 'activo'
    },
    {
      id: 3,
      titulo: 'Feria solidaria de invierno',
      descripcion: 'Venta de productos artesanales y comidas típicas. Los fondos se destinan a familias en situación vulnerable.',
      fecha: '15 de julio de 2026',
      horario: '11:00 - 19:00',
      lugar: 'Plaza San Martín',
      imagen: 'https://placehold.co/400x200/8e44ad/white?text=Feria+Solidaria',
      estado: 'proximo'
    },
    {
      id: 4,
      titulo: 'Maratón solidaria 713',
      descripcion: 'Carrera a beneficio de la biblioteca escolar. Inscripción abierta para toda la comunidad.',
      fecha: '22 de julio de 2026',
      horario: '08:00 - 12:00',
      lugar: 'Parque Municipal',
      imagen: 'https://placehold.co/400x200/27ae60/white?text=Maratón+Solidaria',
      estado: 'proximo'
    },
    {
      id: 5,
      titulo: 'Taller de reciclaje',
      descripcion: 'Aprende a crear objetos útiles con materiales reciclados. Cupos limitados.',
      fecha: '5 de agosto de 2026',
      horario: '14:00 - 16:00',
      lugar: 'Aula Multiuso',
      imagen: 'https://placehold.co/400x200/2980b9/white?text=Taller+Reciclaje',
      estado: 'proximo'
    }
  ];

  constructor(private donarService: DonarService) {}

  ngOnInit(): void {
    this.donarService.getHomeData().subscribe({
      next: (data) => {
        const activos = (data.eventosActivos || []).map((e) => ({
          id: e.id,
          titulo: e.titulo,
          descripcion: e.descripcion,
          fecha: e.fecha,
          horario: e.horario,
          lugar: e.lugar,
          imagen: e.imagen,
          estado: 'activo' as const,
        }));
        const proximos = (data.eventosProximos || []).map((e) => ({
          id: e.id,
          titulo: e.titulo,
          descripcion: e.descripcion,
          fecha: e.fecha,
          horario: e.horario,
          lugar: e.lugar,
          imagen: e.imagen,
          estado: 'proximo' as const,
        }));
        if (activos.length > 0 || proximos.length > 0) {
          this.eventos = [...activos, ...proximos];
        }
      },
      error: () => {
        // Si el backend no está disponible, se mantienen los eventos de ejemplo.
      },
    });
  }

  get eventosActivos(): Evento[] {
    return this.eventos.filter(e => e.estado === 'activo');
  }

  get eventosFuturos(): Evento[] {
    return this.eventos.filter(e => e.estado === 'proximo');
  }

  // Extrae el número de día. Soporta fecha ISO (yyyy-MM-dd, viene del backend)
  // y el formato de texto anterior ("28 de junio de 2026").
  obtenerDia(fecha: string): string {
    const iso = fecha.match(/^\d{4}-\d{2}-(\d{2})/);
    if (iso) return String(Number(iso[1]));
    const match = fecha.match(/^\d+/);
    return match ? match[0] : '';
  }

  // Extrae el mes en formato abreviado (ENE, FEB, ...). Soporta fecha ISO
  // (yyyy-MM-dd) y el formato de texto anterior ("28 de junio de 2026").
  obtenerMes(fecha: string): string {
    const iso = fecha.match(/^\d{4}-(\d{2})-\d{2}/);
    if (iso) return MESES_ABREVIADOS_POR_NUMERO[Number(iso[1]) - 1] ?? '';
    const match = fecha.match(/de\s+([a-záéíóúñ]+)\s+de/i);
    if (!match) return '';
    const mes = match[1].toLowerCase();
    return MESES_ABREVIADOS[mes] ?? '';
  }
}