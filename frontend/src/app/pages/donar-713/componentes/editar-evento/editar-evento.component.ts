import { Component } from '@angular/core';
import { FormularioEventoComponent } from './formulario-evento/formulario-evento.component';
import { FormularioNoticiaComponent } from './formulario-noticia/formulario-noticia.component';
import { Evento, Noticia } from './editar-evento.models';

type SeccionAdmin = 'eventos' | 'noticias';
type TabEventos = 'activo' | 'historial';
type TabNoticias = 'reciente' | 'historial';

@Component({
  selector: 'app-editar-evento',
  standalone: true,
  imports: [FormularioEventoComponent, FormularioNoticiaComponent],
  templateUrl: './editar-evento.component.html',
  styleUrl: './editar-evento.component.css',
})
export class EditarEventoComponent {

  // --- Navegación principal del panel ---
  seccionActiva: SeccionAdmin = 'eventos';

  // --- Sub-navbars ---
  tabEventos: TabEventos = 'activo';
  tabNoticias: TabNoticias = 'reciente';

  // --- Datos ---
  eventos: Evento[] = [
    {
      id: 1,
      titulo: 'Campaña de donación de sangre',
      descripcion: 'Jornada solidaria organizada por estudiantes de 5to año. Todos los grupos sanguíneos son bienvenidos.',
      fecha: '28 de junio de 2026',
      imagen: 'https://placehold.co/400x200/e74c3c/white?text=Donación+de+Sangre',
      estado: 'activo',
    },
    {
      id: 2,
      titulo: 'Colecta de útiles escolares',
      descripcion: 'Recolección de materiales escolares para donar a escuelas rurales de la región.',
      fecha: '30 de junio de 2026',
      imagen: 'https://placehold.co/400x200/e67e22/white?text=Útiles+Escolares',
      estado: 'activo',
    },
    {
      id: 3,
      titulo: 'Feria solidaria de invierno',
      descripcion: 'Venta de productos artesanales y comidas típicas a beneficio de familias vulnerables.',
      fecha: '15 de julio de 2025',
      imagen: 'https://placehold.co/400x200/8e44ad/white?text=Feria+Solidaria',
      estado: 'historial',
    },
  ];

  misNoticias: Noticia[] = [
    {
      id: 1,
      titulo: 'Exitosa Jornada de Donación',
      descripcion: 'Más de 50 estudiantes participaron en nuestra última campaña de donación de sangre, superando todas las expectativas.',
      fecha: '2024-03-15',
      imagen: '',
      estado: 'reciente',
    },
    {
      id: 2,
      titulo: 'Alianza con Hospital Regional',
      descripcion: 'Firmamos un convenio de colaboración con el Hospital Regional para facilitar el proceso de donación.',
      fecha: '2024-03-10',
      imagen: '',
      estado: 'reciente',
    },
    {
      id: 3,
      titulo: 'Reconocimiento a Voluntarios',
      descripcion: 'Nuestros voluntarios fueron reconocidos por su labor solidaria durante todo el año escolar.',
      fecha: '2024-03-05',
      imagen: '',
      estado: 'historial',
    },
  ];

  // --- Estado del formulario de evento ---
  formularioEventoVisible = false;
  eventoSeleccionado: Evento | null = null;

  // --- Estado del formulario de noticia ---
  formularioNoticiaVisible = false;
  noticiaSeleccionada: Noticia | null = null;

  // --- Getters de listas filtradas por sub-navbar ---
  get eventosFiltrados(): Evento[] {
    return this.eventos.filter(e => e.estado === this.tabEventos);
  }

  get noticiasFiltradas(): Noticia[] {
    return this.misNoticias.filter(n => n.estado === this.tabNoticias);
  }

  // --- Navegación ---
  cambiarSeccion(seccion: SeccionAdmin): void {
    this.seccionActiva = seccion;
  }

  cambiarTabEventos(tab: TabEventos): void {
    this.tabEventos = tab;
  }

  cambiarTabNoticias(tab: TabNoticias): void {
    this.tabNoticias = tab;
  }

  // --- CRUD Eventos ---
  abrirFormularioEvento(evento?: Evento): void {
    this.eventoSeleccionado = evento ?? null;
    this.formularioEventoVisible = true;
  }

  cerrarFormularioEvento(): void {
    this.formularioEventoVisible = false;
    this.eventoSeleccionado = null;
  }

  guardarEvento(evento: Evento): void {
    const indice = this.eventos.findIndex(e => e.id === evento.id);
    if (indice !== -1) {
      this.eventos[indice] = evento;
    } else {
      this.eventos = [evento, ...this.eventos];
    }
    this.cerrarFormularioEvento();
  }

  eliminarEvento(evento: Evento): void {
    this.eventos = this.eventos.filter(e => e.id !== evento.id);
  }

  // --- CRUD Noticias ---
  abrirFormularioNoticia(noticia?: Noticia): void {
    this.noticiaSeleccionada = noticia ?? null;
    this.formularioNoticiaVisible = true;
  }

  cerrarFormularioNoticia(): void {
    this.formularioNoticiaVisible = false;
    this.noticiaSeleccionada = null;
  }

  guardarNoticia(noticia: Noticia): void {
    const indice = this.misNoticias.findIndex(n => n.id === noticia.id);
    if (indice !== -1) {
      this.misNoticias[indice] = noticia;
    } else {
      this.misNoticias = [noticia, ...this.misNoticias];
    }
    this.cerrarFormularioNoticia();
  }

  eliminarNoticia(noticia: Noticia): void {
    this.misNoticias = this.misNoticias.filter(n => n.id !== noticia.id);
  }
}
