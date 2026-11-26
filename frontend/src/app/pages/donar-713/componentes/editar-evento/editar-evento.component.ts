import { Component, OnInit } from '@angular/core';
import { FormularioEventoComponent, GuardarEventoPayload } from './formulario-evento/formulario-evento.component';
import { FormularioNoticiaComponent, GuardarNoticiaPayload } from './formulario-noticia/formulario-noticia.component';
import { FormularioSlideComponent, GuardarSlidePayload } from './formulario-slide/formulario-slide.component';
import { FormularioInformacionComponent, GuardarInformacionPayload } from './formulario-informacion/formulario-informacion.component';
import { GestorTiposInformacionComponent } from './gestor-tipos-informacion/gestor-tipos-informacion.component';
import { Evento, Informacion, Noticia, Slide, TipoInformacion } from './editar-evento.models';
import {
  CarruselSlideApi,
  DonarService,
  EventoApi,
  InformacionApi,
  NoticiaApi,
} from '../../../../services/donar.service';

type SeccionAdmin = 'carrusel' | 'eventos' | 'noticias' | 'informacion';
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

function slideDeApi(s: CarruselSlideApi): Slide {
  return {
    id: s.id,
    titulo: s.titulo,
    descripcion: s.descripcion,
    botonTexto: s.boton_texto,
    imagen: s.imagen,
    orden: s.orden,
    activo: s.activo,
  };
}

function informacionDeApi(i: InformacionApi): Informacion {
  return {
    id: i.id,
    tipo: i.tipo,
    titulo: i.titulo,
    descripcion: i.descripcion,
    imagen: i.imagen ?? '',
    orden: i.orden,
    activo: i.activo,
  };
}

@Component({
  selector: 'app-editar-evento',
  standalone: true,
  imports: [
    FormularioEventoComponent,
    FormularioNoticiaComponent,
    FormularioSlideComponent,
    FormularioInformacionComponent,
    GestorTiposInformacionComponent,
  ],
  templateUrl: './editar-evento.component.html',
  styleUrl: './editar-evento.component.css',
})
export class EditarEventoComponent implements OnInit {

  seccionActiva: SeccionAdmin = 'eventos';

  tabEventos: TabEventos = 'activo';
  tabNoticias: TabNoticias = 'reciente';
  tabInformacion = '';

  eventos: Evento[] = [];
  misNoticias: Noticia[] = [];
  slides: Slide[] = [];
  informacion: Informacion[] = [];
  tiposInformacion: TipoInformacion[] = [];

  cargandoEventos = false;
  cargandoNoticias = false;
  cargandoCarrusel = false;
  cargandoInformacion = false;
  errorEventos = '';
  errorNoticias = '';
  errorCarrusel = '';
  errorInformacion = '';

  formularioEventoVisible = false;
  eventoSeleccionado: Evento | null = null;

  formularioNoticiaVisible = false;
  noticiaSeleccionada: Noticia | null = null;

  formularioSlideVisible = false;
  slideSeleccionado: Slide | null = null;
  imagenesExistentes: string[] = [];

  formularioInfoVisible = false;
  infoSeleccionada: Informacion | null = null;
  tipoInfoNueva = '';

  gestorTiposVisible = false;

  constructor(private donarService: DonarService) {}

  ngOnInit(): void {
    this.cargarEventos();
    this.cargarNoticias();
    this.cargarCarrusel();
    this.cargarTiposInformacion();
    this.cargarInformacion();
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

  private cargarCarrusel(): void {
    this.cargandoCarrusel = true;
    this.donarService.getCarrusel().subscribe({
      next: (slides) => {
        this.slides = slides.map(slideDeApi);
        this.cargandoCarrusel = false;
      },
      error: () => {
        this.errorCarrusel = 'No se pudo cargar el carrusel desde el servidor.';
        this.cargandoCarrusel = false;
      },
    });
  }

  private cargarInformacion(): void {
    this.cargandoInformacion = true;
    this.donarService.getInformacion().subscribe({
      next: (items) => {
        this.informacion = items.map(informacionDeApi);
        this.cargandoInformacion = false;
      },
      error: () => {
        this.errorInformacion = 'No se pudo cargar la información desde el servidor.';
        this.cargandoInformacion = false;
      },
    });
  }

  private cargarTiposInformacion(): void {
    this.donarService.getTiposInformacion().subscribe({
      next: (tipos) => {
        this.tiposInformacion = tipos;
        if (!tipos.some(t => t.nombre === this.tabInformacion)) {
          this.tabInformacion = tipos[0]?.nombre ?? '';
        }
      },
      error: () => {
        this.errorInformacion = 'No se pudieron cargar los tipos de información desde el servidor.';
      },
    });
  }

  get eventosFiltrados(): Evento[] {
    return this.eventos.filter(e => e.estado === this.tabEventos);
  }

  get noticiasFiltradas(): Noticia[] {
    return this.misNoticias.filter(n => n.estado === this.tabNoticias);
  }

  get slidesOrdenados(): Slide[] {
    return [...this.slides].sort((a, b) => a.orden - b.orden || a.id - b.id);
  }

  get informacionFiltrada(): Informacion[] {
    return this.informacion
      .filter(i => i.tipo === this.tabInformacion)
      .sort((a, b) => a.orden - b.orden || a.id - b.id);
  }

  cambiarSeccion(seccion: SeccionAdmin): void {
    this.seccionActiva = seccion;
  }

  cambiarTabEventos(tab: TabEventos): void {
    this.tabEventos = tab;
  }

  cambiarTabNoticias(tab: TabNoticias): void {
    this.tabNoticias = tab;
  }

  cambiarTabInformacion(tab: string): void {
    this.tabInformacion = tab;
  }

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

  abrirFormularioSlide(slide?: Slide): void {
    this.slideSeleccionado = slide ?? null;
    this.imagenesExistentes = this.calcularImagenesExistentes();
    this.formularioSlideVisible = true;
  }

  cerrarFormularioSlide(): void {
    this.formularioSlideVisible = false;
    this.slideSeleccionado = null;
  }

  guardarSlide(payload: GuardarSlidePayload): void {
    const peticion = payload.id
      ? this.donarService.actualizarSlide(payload.id, payload.formData)
      : this.donarService.crearSlide(payload.formData);

    peticion.subscribe({
      next: (slideGuardado) => {
        const slide = slideDeApi(slideGuardado);
        const indice = this.slides.findIndex(s => s.id === slide.id);
        if (indice !== -1) {
          this.slides[indice] = slide;
          this.slides = [...this.slides];
        } else {
          this.slides = [...this.slides, slide];
        }
        this.cerrarFormularioSlide();
      },
      error: () => {
        this.errorCarrusel = 'No se pudo guardar el slide. Revisá los datos e intentá nuevamente.';
      },
    });
  }

  eliminarSlide(slide: Slide): void {
    this.donarService.eliminarSlide(slide.id).subscribe({
      next: () => {
        this.slides = this.slides.filter(s => s.id !== slide.id);
      },
      error: () => {
        this.errorCarrusel = 'No se pudo eliminar el slide.';
      },
    });
  }

  abrirFormularioInfo(info?: Informacion): void {
    this.infoSeleccionada = info ?? null;
    this.tipoInfoNueva = this.tabInformacion;
    this.formularioInfoVisible = true;
  }

  cerrarFormularioInfo(): void {
    this.formularioInfoVisible = false;
    this.infoSeleccionada = null;
  }

  guardarInfo(payload: GuardarInformacionPayload): void {
    const peticion = payload.id
      ? this.donarService.actualizarInformacion(payload.id, payload.formData)
      : this.donarService.crearInformacion(payload.formData);

    peticion.subscribe({
      next: (infoGuardada) => {
        const info = informacionDeApi(infoGuardada);
        const indice = this.informacion.findIndex(i => i.id === info.id);
        if (indice !== -1) {
          this.informacion[indice] = info;
          this.informacion = [...this.informacion];
        } else {
          this.informacion = [...this.informacion, info];
        }
        this.tabInformacion = info.tipo;
        this.cerrarFormularioInfo();
      },
      error: () => {
        this.errorInformacion = 'No se pudo guardar la información. Revisá los datos e intentá nuevamente.';
      },
    });
  }

  abrirGestorTipos(): void {
    this.gestorTiposVisible = true;
  }

  cerrarGestorTipos(): void {
    this.gestorTiposVisible = false;
  }

  // Se cambiaron tipos (alta, renombre, orden o baja): se vuelve a cargar todo para que quede al día.
  alCambiarTipos(): void {
    this.cargarTiposInformacion();
    this.cargarInformacion();
  }

  eliminarInfo(info: Informacion): void {
    this.donarService.eliminarInformacion(info.id).subscribe({
      next: () => {
        this.informacion = this.informacion.filter(i => i.id !== info.id);
      },
      error: () => {
        this.errorInformacion = 'No se pudo eliminar la información.';
      },
    });
  }

  private calcularImagenesExistentes(): string[] {
    const rutas = [
      ...this.eventos.map(e => e.imagen),
      ...this.misNoticias.map(n => n.imagen),
      ...this.slides.map(s => s.imagen),
    ].filter(ruta => !!ruta);
    return Array.from(new Set(rutas));
  }
}
