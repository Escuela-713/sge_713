import { Component, OnInit } from '@angular/core';
import { FormularioEventoComponent, GuardarEventoPayload } from './formulario-evento/formulario-evento.component';
import { FormularioNoticiaComponent, GuardarNoticiaPayload } from './formulario-noticia/formulario-noticia.component';
import { Evento, Noticia } from './editar-evento.models';
import { DonarService, EventoApi, NoticiaApi } from '../../../../services/donar.service';

type SeccionAdmin = 'eventos' | 'noticias';
type TabEventos = 'activo' | 'proximo' | 'historial';
type TabNoticias = 'reciente' | 'historial';

function eventoDeApi(e: EventoApi): Evento {
  return {
    id: e.id,
    titulo: e.titulo,
    descripcion: e.descripcion,
    fecha: e.fecha,
    horario: e.horario,
    lugar: e.lugar,
    imagen: e.imagen,
    estado: e.estado,
  };
}

function noticiaDeApi(n: NoticiaApi): Noticia {
  return {
    id: n.id,
    titulo: n.titulo,
    descripcion: n.descripcion,
    fecha: n.fecha,
    imagen: n.imagen,
    estado: n.estado,
  };
}

@Component({
  selector: 'app-editar-evento',
  standalone: true,
  imports: [FormularioEventoComponent, FormularioNoticiaComponent],
  templateUrl: './editar-evento.component.html',
  styleUrl: './editar-evento.component.css',
})
export class EditarEventoComponent implements OnInit {

  // --- Navegación principal del panel ---
  seccionActiva: SeccionAdmin = 'eventos';

  // --- Sub-navbars ---
  tabEventos: TabEventos = 'activo';
  tabNoticias: TabNoticias = 'reciente';

  // --- Datos (se cargan desde el backend de Donar 713 en ngOnInit) ---
  eventos: Evento[] = [];
  misNoticias: Noticia[] = [];

  cargandoEventos = false;
  cargandoNoticias = false;
  errorEventos = '';
  errorNoticias = '';

  // --- Estado del formulario de evento ---
  formularioEventoVisible = false;
  eventoSeleccionado: Evento | null = null;

  // --- Estado del formulario de noticia ---
  formularioNoticiaVisible = false;
  noticiaSeleccionada: Noticia | null = null;

  constructor(private donarService: DonarService) {}

  ngOnInit(): void {
    this.cargarEventos();
    this.cargarNoticias();
  }

  private cargarEventos(): void {
    this.cargandoEventos = true;
    this.donarService.getEventos().subscribe({
      next: (eventos) => {
        this.eventos = eventos.map(eventoDeApi);
        this.cargandoEventos = false;
      },
      error: () => {
        this.errorEventos = 'No se pudieron cargar los eventos desde el servidor.';
        this.cargandoEventos = false;
      },
    });
  }

  private cargarNoticias(): void {
    this.cargandoNoticias = true;
    this.donarService.getNoticias().subscribe({
      next: (noticias) => {
        this.misNoticias = noticias.map(noticiaDeApi);
        this.cargandoNoticias = false;
      },
      error: () => {
        this.errorNoticias = 'No se pudieron cargar las noticias desde el servidor.';
        this.cargandoNoticias = false;
      },
    });
  }

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

  guardarEvento(payload: GuardarEventoPayload): void {
    const peticion = payload.id
      ? this.donarService.actualizarEvento(payload.id, payload.formData)
      : this.donarService.crearEvento(payload.formData);

    peticion.subscribe({
      next: (eventoGuardado) => {
        const evento = eventoDeApi(eventoGuardado);
        const indice = this.eventos.findIndex(e => e.id === evento.id);
        if (indice !== -1) {
          this.eventos[indice] = evento;
        } else {
          this.eventos = [evento, ...this.eventos];
        }
        this.cerrarFormularioEvento();
      },
      error: () => {
        this.errorEventos = 'No se pudo guardar el evento. Revisá los datos e intentá nuevamente.';
      },
    });
  }

  eliminarEvento(evento: Evento): void {
    this.donarService.eliminarEvento(evento.id).subscribe({
      next: () => {
        this.eventos = this.eventos.filter(e => e.id !== evento.id);
      },
      error: () => {
        this.errorEventos = 'No se pudo eliminar el evento.';
      },
    });
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

  guardarNoticia(payload: GuardarNoticiaPayload): void {
    const peticion = payload.id
      ? this.donarService.actualizarNoticia(payload.id, payload.formData)
      : this.donarService.crearNoticia(payload.formData);

    peticion.subscribe({
      next: (noticiaGuardada) => {
        const noticia = noticiaDeApi(noticiaGuardada);
        const indice = this.misNoticias.findIndex(n => n.id === noticia.id);
        if (indice !== -1) {
          this.misNoticias[indice] = noticia;
        } else {
          this.misNoticias = [noticia, ...this.misNoticias];
        }
        this.cerrarFormularioNoticia();
      },
      error: () => {
        this.errorNoticias = 'No se pudo guardar la noticia. Revisá los datos e intentá nuevamente.';
      },
    });
  }

  eliminarNoticia(noticia: Noticia): void {
    this.donarService.eliminarNoticia(noticia.id).subscribe({
      next: () => {
        this.misNoticias = this.misNoticias.filter(n => n.id !== noticia.id);
      },
      error: () => {
        this.errorNoticias = 'No se pudo eliminar la noticia.';
      },
    });
  }
}
