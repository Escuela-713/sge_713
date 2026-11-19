
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { CooperadoraMovimientosService } from '@services/cooperadora-movimientos.service';

type TipoMovimiento = 'Ingreso' | 'Egreso';

interface MovimientoCooperadora {
  id: string;
  fecha: string;
  tipo: TipoMovimiento;
  monto: number;
  origen: string;
  destino: string;
  descripcion: string;
}

@Component({
  selector: 'app-movimientos',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './movimientos.component.html',
  styleUrl: './movimientos.component.css',
})
export class MovimientosComponent implements OnInit {

  private readonly movimientosService = inject(CooperadoraMovimientosService);


  movimientos: MovimientoCooperadora[] = [];
  todosLosMovimientos: MovimientoCooperadora[] = [];

  movimientoEditando: MovimientoCooperadora | null = null;
  guardando = false;
  eliminando = false;

  mensaje = '';
  cargando = false;
  error = '';

  
  tipoFiltro: TipoMovimiento | '' = '';
  fechaFiltro = '';
  fechaFiltroTexto = '';
  fechaInvalida = false;

  ngOnInit(): void {
    this.cargarMovimientos();
  }

  cargarMovimientos(): void {
    this.cargando = true;
    this.error = '';

    this.movimientosService.getMovimientos()
      .pipe(
        finalize(() => {
          this.cargando = false;
        })
      )
      .subscribe({
        next: (data: MovimientoCooperadora[]) => {
          this.todosLosMovimientos = [...data];
          this.aplicarFiltros();
        },
        error: () => {
          this.error = 'No se pudieron cargar los movimientos.';
          this.movimientos = [];
          this.todosLosMovimientos = [];
        },
      });
  }

  aplicarFiltros(): void {
    this.movimientos = this.todosLosMovimientos
      .filter((movimiento) => {
        const coincideTipo =
          !this.tipoFiltro ||
          movimiento.tipo === this.tipoFiltro;

        const fechaMovimiento =
          this.normalizarFecha(movimiento.fecha);

        const coincideFecha =
          !this.fechaFiltro ||
          fechaMovimiento === this.fechaFiltro;

        return coincideTipo && coincideFecha;
      })
      .sort(
        (a, b) =>
          this.obtenerMarcaDeTiempo(b.fecha) -
          this.obtenerMarcaDeTiempo(a.fecha)
      );
  }

  actualizarFechaFiltro(valor: string): void {
    this.fechaFiltroTexto = valor;

    if (!valor.trim()) {
      this.fechaFiltro = '';
      this.fechaInvalida = false;
      this.aplicarFiltros();
      return;
    }

    const fechaNormalizada = this.normalizarFecha(valor);

    if (!fechaNormalizada) {
      this.fechaFiltro = '';
      this.fechaInvalida = true;
      this.aplicarFiltros();
      return;
    }

    this.fechaFiltro = fechaNormalizada;
    this.fechaInvalida = false;
    this.aplicarFiltros();
  }


  private normalizarFecha(fecha: unknown): string | null {
    if (typeof fecha !== 'string') {
      return null;
    }

    const valor = fecha.trim();

    const iso = valor.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    const local = valor.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);

    if (!iso && !local) {
      return null;
    }

    const anio = Number(iso?.[1] ?? local?.[3]);
    const mes = Number(iso?.[2] ?? local?.[2]);
    const dia = Number(iso?.[3] ?? local?.[1]);
    
    const fechaUtc = new Date(Date.UTC(anio, mes - 1, dia));

    if (
      fechaUtc.getUTCFullYear() !== anio ||
      fechaUtc.getUTCMonth() !== mes - 1 ||
      fechaUtc.getUTCDate() !== dia
    ) {
      return null;
    }

    return `${anio}-${String(mes).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
  }


  private obtenerMarcaDeTiempo(fecha: unknown): number {
    const fechaNormalizada = this.normalizarFecha(fecha);

    return fechaNormalizada
      ? Date.parse(`${fechaNormalizada}T00:00:00Z`)
      : Number.NEGATIVE_INFINITY;
  }

  formatearFecha(fecha: unknown): string {
    if (!fecha) {
      return '';
    }

    const fechaNormalizada = this.normalizarFecha(fecha);

    if (!fechaNormalizada) {
      return String(fecha);
    }

    const [anio, mes, dia] = fechaNormalizada.split('-');

    return `${Number(dia)}/${Number(mes)}/${anio}`;
  }

  formatearMonto(monto: number): string {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(monto);
  }

  editarMovimiento(movimiento: MovimientoCooperadora): void {
    if (this.guardando || this.eliminando) {
      return;
    }

    this.movimientoEditando = {
      ...movimiento,
      fecha: this.normalizarFecha(movimiento.fecha) ?? '',
    };

    this.mensaje = '';
  }

  cancelarEdicion(): void {
    if (this.guardando) {
      return;
    }

    this.movimientoEditando = null;
  }


  guardarEdicion(): void {
    if (!this.movimientoEditando || this.guardando || this.eliminando) {
      return;
    }

    const movimiento = this.movimientoEditando;

    const fechaNormalizada = this.normalizarFecha(movimiento.fecha);

    if (
      !fechaNormalizada ||
      !Number.isFinite(movimiento.monto) ||
      movimiento.monto <= 0 ||
      !['Ingreso', 'Egreso'].includes(movimiento.tipo)
    ) {
      this.mensaje = 'Verificá los datos del movimiento.';
      return;
    }

    const { id, ...datos } = movimiento;

    this.guardando = true;
    this.mensaje = '';

    this.movimientosService.actualizarMovimiento(id, {
      ...datos,
      fecha: fechaNormalizada,
    })
      .pipe(
        finalize(() => {
          this.guardando = false;
        })
      )
      .subscribe({
        next: (movimientoActualizado: MovimientoCooperadora) => {
          this.todosLosMovimientos = this.todosLosMovimientos.map(
            (item) =>
              item.id === id ? movimientoActualizado : item
          );

          this.aplicarFiltros();
          this.movimientoEditando = null;
          this.mensaje = 'Movimiento actualizado correctamente.';
        },
        error: () => {
          this.mensaje = 'No se pudo actualizar el movimiento.';
        },
      });
  }

  eliminarMovimiento(movimiento: MovimientoCooperadora): void {
    if (this.eliminando || this.guardando) {
      return;
    }

    const confirmar = window.confirm(
      '¿Seguro que querés eliminar este movimiento?'
    );

    if (!confirmar) {
      return;
    }

    this.eliminando = true;
    this.mensaje = '';

    this.movimientosService.eliminarMovimiento(movimiento.id)
      .pipe(
        finalize(() => {
          this.eliminando = false;
        })
      )
      .subscribe({
        next: () => {
          this.todosLosMovimientos = this.todosLosMovimientos.filter(
            (item) => item.id !== movimiento.id
          );

          if (this.movimientoEditando?.id === movimiento.id) {
            this.movimientoEditando = null;
          }

          this.aplicarFiltros();
          this.mensaje = 'Movimiento eliminado correctamente.';
        },
        error: () => {
          this.mensaje = 'No se pudo eliminar el movimiento.';
        },
      });
  }
}
