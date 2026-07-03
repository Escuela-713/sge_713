import { Component } from '@angular/core';
interface Evento {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  imagen: string;
  estado: 'activo' | 'proximo';
}
@Component({
  selector: 'app-eventos',
  imports: [],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css',
})
export class EventosComponent {
 eventos: Evento[] = [
    {
      id: 1,
      titulo: 'Campaña de donación de sangre',
      descripcion: 'Jornada solidaria organizada por estudiantes de 5to año. Todos los grupos sanguíneos son bienvenidos.',
      fecha: '28 de junio de 2026',
      imagen: 'https://placehold.co/400x200/e74c3c/white?text=Donación+de+Sangre',
      estado: 'activo'
    },
    {
      id: 2,
      titulo: 'Colecta de útiles escolares',
      descripcion: 'Recolección de materiales escolares para donar a escuelas rurales de la región.',
      fecha: '30 de junio de 2026',
      imagen: 'https://placehold.co/400x200/e67e22/white?text=Útiles+Escolares',
      estado: 'activo'
    },
    {
      id: 3,
      titulo: 'Feria solidaria de invierno',
      descripcion: 'Venta de productos artesanales y comidas típicas. Los fondos se destinan a familias en situación vulnerable.',
      fecha: '15 de julio de 2026',
      imagen: 'https://placehold.co/400x200/8e44ad/white?text=Feria+Solidaria',
      estado: 'proximo'
    },
    {
      id: 4,
      titulo: 'Maratón solidaria 713',
      descripcion: 'Carrera a beneficio de la biblioteca escolar. Inscripción abierta para toda la comunidad.',
      fecha: '22 de julio de 2026',
      imagen: 'https://placehold.co/400x200/27ae60/white?text=Maratón+Solidaria',
      estado: 'proximo'
    },
    {
      id: 5,
      titulo: 'Taller de reciclaje',
      descripcion: 'Aprende a crear objetos útiles con materiales reciclados. Cupos limitados.',
      fecha: '5 de agosto de 2026',
      imagen: 'https://placehold.co/400x200/2980b9/white?text=Taller+Reciclaje',
      estado: 'proximo'
    }
  ];

  get eventosActivos(): Evento[] {
    return this.eventos.filter(e => e.estado === 'activo');
  }

  get eventosFuturos(): Evento[] {
    return this.eventos.filter(e => e.estado === 'proximo');
  }
}
