import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CooperadoraMovimientosService } from '@services/cooperadora-movimientos.service';

interface MovimientoHistorial {
  id: number;
  fecha: string;
  tipo: string;
  monto: number;
  origen: string;
  destino: string;
  descripcion: string;
}

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  textoBusqueda = '';
  historial: MovimientoHistorial[] = [];
  cargando = false;
  error = '';

  get historialFiltrado() {

    const busqueda = this.textoBusqueda
      .toLowerCase()
      .replace(/\$/g, '')
      .trim();

    return this.historial.filter(registro => {

      const monto = registro.monto.toString();
      const fechaFormateada = this.formatearFecha(registro.fecha).toLowerCase();

      return (
        registro.tipo.toLowerCase().includes(busqueda) ||
        registro.origen.toLowerCase().includes(busqueda) ||
        registro.destino.toLowerCase().includes(busqueda) ||
        registro.descripcion.toLowerCase().includes(busqueda) ||
        (registro.fecha.toLowerCase().includes(busqueda) || fechaFormateada.includes(busqueda)) ||
        monto.includes(busqueda)
      );
    });
  }

  constructor(private movimientosService: CooperadoraMovimientosService) { }

  ngOnInit(): void {
    this.cargando = true;
    this.movimientosService.getMovimientos().subscribe({
      next: (movimientos: MovimientoHistorial[]) => {
        this.historial = movimientos;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo cargar el historial de movimientos.';
        this.cargando = false;
      }
    });
  }

  formatearFecha(fecha: string): string {
    const [anio, mes, dia] = fecha.split('-');
    return dia && mes && anio ? `${Number(dia)}/${Number(mes)}/${anio}` : fecha;
  }
}