import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { DonarService } from '../../../../../services/donar.service';
import { TipoInformacion } from '../editar-evento.models';

@Component({
  selector: 'app-gestor-tipos-informacion',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './gestor-tipos-informacion.component.html',
  styleUrl: './gestor-tipos-informacion.component.css',
})
export class GestorTiposInformacionComponent {
  @Input() tipos: TipoInformacion[] = [];
  // Avisa que hubo un cambio para que el panel vuelva a cargar los tipos y las tarjetas.
  @Output() cambio = new EventEmitter<void>();
  @Output() cerrar = new EventEmitter<void>();

  nuevoNombre = '';
  editandoId: number | null = null;
  nombreEditado = '';
  error = '';
  ocupado = false;

  constructor(private donarService: DonarService) {}

  agregar(): void {
    const nombre = this.nuevoNombre.trim();
    if (!nombre) {
      this.error = 'Escribí el nombre del tipo.';
      return;
    }

    this.iniciar();
    this.donarService.crearTipoInformacion(nombre).subscribe({
      next: () => {
        this.nuevoNombre = '';
        this.terminar();
      },
      error: (err) => this.fallar(err, 'No se pudo crear el tipo.'),
    });
  }

  empezarEdicion(tipo: TipoInformacion): void {
    this.error = '';
    this.editandoId = tipo.id;
    this.nombreEditado = tipo.nombre;
  }

  cancelarEdicion(): void {
    this.editandoId = null;
    this.nombreEditado = '';
    this.error = '';
  }

  guardarEdicion(tipo: TipoInformacion): void {
    const nombre = this.nombreEditado.trim();
    if (!nombre) {
      this.error = 'El nombre no puede quedar vacío.';
      return;
    }
    if (nombre === tipo.nombre) {
      this.cancelarEdicion();
      return;
    }

    this.iniciar();
    this.donarService.actualizarTipoInformacion(tipo.id, { nombre }).subscribe({
      next: () => {
        this.editandoId = null;
        this.terminar();
      },
      error: (err) => this.fallar(err, 'No se pudo renombrar el tipo.'),
    });
  }

  eliminar(tipo: TipoInformacion): void {
    if (tipo.cantidad > 0) {
      this.error = `No se puede eliminar «${tipo.nombre}»: tiene ${tipo.cantidad} tarjeta(s). Cambialas de tipo o eliminalas primero.`;
      return;
    }

    this.iniciar();
    this.donarService.eliminarTipoInformacion(tipo.id).subscribe({
      next: () => this.terminar(),
      error: (err) => this.fallar(err, 'No se pudo eliminar el tipo.'),
    });
  }

  // Mueve el tipo una posición hacia arriba (-1) o hacia abajo (+1) y guarda el orden nuevo.
  mover(indice: number, desplazamiento: -1 | 1): void {
    const lista = [...this.tipos];
    const destino = indice + desplazamiento;
    if (destino < 0 || destino >= lista.length) {
      return;
    }
    [lista[indice], lista[destino]] = [lista[destino], lista[indice]];

    const cambios = lista
      .map((tipo, posicion) => ({ tipo, posicion }))
      .filter(({ tipo, posicion }) => tipo.orden !== posicion)
      .map(({ tipo, posicion }) => this.donarService.actualizarTipoInformacion(tipo.id, { orden: posicion }));

    if (cambios.length === 0) {
      return;
    }

    this.iniciar();
    forkJoin(cambios).subscribe({
      next: () => this.terminar(),
      error: (err) => this.fallar(err, 'No se pudo cambiar el orden.'),
    });
  }

  private iniciar(): void {
    this.error = '';
    this.ocupado = true;
  }

  private terminar(): void {
    this.ocupado = false;
    this.cambio.emit();
  }

  private fallar(err: HttpErrorResponse, mensajePorDefecto: string): void {
    this.ocupado = false;
    const detalle = err?.error;
    this.error = detalle?.nombre?.[0] ?? detalle?.detail ?? mensajePorDefecto;
  }
}
