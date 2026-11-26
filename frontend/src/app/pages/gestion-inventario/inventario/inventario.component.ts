import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  BienInventario,
  InventarioApiService,
  Opcion
} from '../inventario-api.service';

@Component({
  selector: 'app-inventario',
  imports: [FormsModule, RouterLink],
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  private api = inject(InventarioApiService);

  bienes: BienInventario[] = [];
  categorias: Opcion[] = [];
  ubicaciones: Opcion[] = [];

  busqueda = '';
  cargando = true;
  error = '';
  mensajeError = '';
  expandido: number | null = null;

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.cargando = true;
    this.error = '';

    forkJoin({
      bienes: this.api.listarBienes(),
      categorias: this.api.listarCategorias().pipe(catchError(() => of<Opcion[]>([]))),
      ubicaciones: this.api.listarUbicaciones().pipe(catchError(() => of<Opcion[]>([])))
    }).subscribe({
      next: ({ bienes, categorias, ubicaciones }) => {
        this.bienes = bienes;
        this.categorias = categorias;
        this.ubicaciones = ubicaciones;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar el inventario:', err);
        this.error = 'No se pudo cargar el inventario. Intenta nuevamente.';
        this.cargando = false;
      }
    });
  }

  get bienesFiltrados(): BienInventario[] {
    const termino = this.busqueda.trim().toLowerCase();
    if (!termino) {
      return this.bienes;
    }
    return this.bienes.filter((bien) =>
      [
        bien.nombre,
        bien.codigo_especial,
        this.categoriaDe(bien),
        this.ubicacionDe(bien),
        bien.estado
      ].some((campo) => (campo ?? '').toLowerCase().includes(termino))
    );
  }

  categoriaDe(bien: BienInventario): string {
    return this.etiqueta(bien.categoria, this.categorias);
  }

  ubicacionDe(bien: BienInventario): string {
    return this.etiqueta(bien.ubicacion, this.ubicaciones);
  }

  prestadoDe(bien: BienInventario): string {
    if (bien.prestado === undefined || bien.prestado === null) {
      return 'N/D';
    }
    return bien.prestado ? 'Sí' : 'No';
  }

  private etiqueta(valor: number | string | null | undefined, lista: Opcion[]): string {
    if (valor === null || valor === undefined || valor === '') {
      return 'N/D';
    }
    const opcion = lista.find((o) => String(o.id) === String(valor));
    return opcion ? opcion.nombre : String(valor);
  }

  verMas(bien: BienInventario) {
    this.expandido = this.expandido === bien.id_bien ? null : (bien.id_bien ?? null);
  }

  eliminar(bien: BienInventario) {
    if (bien.id_bien === undefined) {
      return;
    }
    if (!confirm(`¿Seguro que querés eliminar "${bien.nombre}"? Esta acción no se puede deshacer.`)) {
      return;
    }

    this.mensajeError = '';
    this.api.eliminarBien(bien.id_bien).subscribe({
      next: () => {
        this.bienes = this.bienes.filter((b) => b.id_bien !== bien.id_bien);
        if (this.expandido === bien.id_bien) {
          this.expandido = null;
        }
      },
      error: (err) => {
        console.error('Error al eliminar el bien:', err);
        this.mensajeError = 'No se pudo eliminar el bien. Intenta nuevamente.';
      }
    });
  }
}