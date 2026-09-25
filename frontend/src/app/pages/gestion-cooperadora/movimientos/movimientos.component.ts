import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CooperadoraMovimientosService } from "@services/cooperadora-movimientos.service";

@Component({
  selector: "app-movimientos",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./movimientos.component.html",
  styleUrls: ["./movimientos.component.css"],
})
export class MovimientosComponent {
  movimientos: any;
  movimientoEditando: any = null;
  mensaje = '';

  constructor(private movimientosService: CooperadoraMovimientosService) {
    this.movimientosService.getMovimientos().subscribe({
      next: (data) => {
        this.movimientos = data;
      },
      error: (error) => {
        console.error("Error al obtener los movimientos:", error);
      },
    });
  }

  formatearFecha(fecha: string): string {
    if (!fecha) return '';
    const [anio, mes, dia] = fecha.split('-');
    return dia && mes && anio ? `${Number(dia)}/${Number(mes)}/${anio}` : fecha;
  }

  formatearMonto(monto: number): string {
    return `$${new Intl.NumberFormat('es-AR', { maximumFractionDigits: 0 }).format(monto)}`;
  }

  editarMovimiento(movimiento: any): void {
    this.movimientoEditando = { ...movimiento };
    this.mensaje = '';
  }

  cancelarEdicion(): void {
    this.movimientoEditando = null;
  }

  guardarEdicion(): void {
    if (!this.movimientoEditando) return;

    const { id, ...datos } = this.movimientoEditando;
    this.movimientosService.actualizarMovimiento(id, datos).subscribe({
      next: (movimientoActualizado) => {
        this.movimientos = this.movimientos.map((movimiento: any) =>
          movimiento.id === id ? movimientoActualizado : movimiento
        );
        this.movimientoEditando = null;
        this.mensaje = 'Movimiento actualizado correctamente.';
      },
      error: () => this.mensaje = 'No se pudo actualizar el movimiento.'
    });
  }

  eliminarMovimiento(movimiento: any): void {
    if (!confirm('¿Seguro que querés eliminar este movimiento?')) return;

    this.movimientosService.eliminarMovimiento(movimiento.id).subscribe({
      next: () => {
        this.movimientos = this.movimientos.filter((item: any) => item.id !== movimiento.id);
        this.mensaje = 'Movimiento eliminado correctamente.';
      },
      error: () => this.mensaje = 'No se pudo eliminar el movimiento.'
    });
  }
}
