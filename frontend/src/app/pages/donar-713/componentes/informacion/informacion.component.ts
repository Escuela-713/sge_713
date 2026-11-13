import { Component, DOCUMENT, ElementRef, HostListener, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { DonarService, InformacionApi, TipoInformacionApi } from '../../../../services/donar.service';

interface GrupoInformacion {
  nombre: string;
  items: InformacionApi[];
}

@Component({
  selector: 'app-informacion',
  imports: [],
  templateUrl: './informacion.component.html',
  styleUrl: './informacion.component.css',
})
export class InformacionComponent implements OnInit, OnDestroy {
  private donarService = inject(DonarService);
  private documento = inject(DOCUMENT);

  grupos: GrupoInformacion[] = [];
  seleccionada: InformacionApi | null = null;

  // Recorte desde el que "nace" la vista expandida: el lugar donde estaba la tarjeta.
  recorteInicial = 'inset(0)';
  private tarjetaOrigen: HTMLElement | null = null;

  // Al abrirse la vista expandida, el foco va al botón de cerrar.
  @ViewChild('botonCerrar')
  set botonCerrar(ref: ElementRef<HTMLButtonElement> | undefined) {
    ref?.nativeElement.focus();
  }

  ngOnInit(): void {
    this.donarService.getHomeData().subscribe({
      next: (data) => {
        this.grupos = this.agrupar(data.informacion || [], data.tiposInformacion || []);
      },
      error: () => {
        this.grupos = [];
      },
    });
  }

  ngOnDestroy(): void {
    this.bloquearScroll(false);
  }

  abrir(item: InformacionApi, evento: Event): void {
    const tarjeta = evento.currentTarget as HTMLElement;
    const caja = tarjeta.getBoundingClientRect();
    const ventana = this.documento.defaultView;
    const ancho = ventana?.innerWidth ?? caja.right;
    const alto = ventana?.innerHeight ?? caja.bottom;

    this.recorteInicial = `inset(${caja.top}px ${ancho - caja.right}px ${alto - caja.bottom}px ${caja.left}px round 18px)`;
    this.tarjetaOrigen = tarjeta;
    this.seleccionada = item;
    this.bloquearScroll(true);
  }

  @HostListener('document:keydown.escape')
  cerrar(): void {
    if (!this.seleccionada) {
      return;
    }
    this.seleccionada = null;
    this.bloquearScroll(false);
    this.tarjetaOrigen?.focus();
    this.tarjetaOrigen = null;
  }

  private bloquearScroll(bloquear: boolean): void {
    this.documento.body.style.overflow = bloquear ? 'hidden' : '';
  }

  // Agrupa las tarjetas por tipo, siguiendo el orden de la lista de tipos.
  private agrupar(items: InformacionApi[], tipos: TipoInformacionApi[]): GrupoInformacion[] {
    const porTipo = new Map<string, InformacionApi[]>();
    for (const item of items) {
      porTipo.set(item.tipo, [...(porTipo.get(item.tipo) ?? []), item]);
    }

    const grupos: GrupoInformacion[] = [];
    for (const tipo of tipos) {
      const lista = porTipo.get(tipo.nombre);
      if (lista && lista.length > 0) {
        grupos.push({ nombre: tipo.nombre, items: lista });
        porTipo.delete(tipo.nombre);
      }
    }
    // Por si alguna tarjeta tiene un tipo que no está en la lista, igual se muestra.
    for (const [nombre, lista] of porTipo) {
      grupos.push({ nombre, items: lista });
    }
    return grupos;
  }
}
