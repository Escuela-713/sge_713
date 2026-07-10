import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  textoBusqueda = '';

  historial = [
    {
      id: 1,
      fecha: '03/09/2025',
      tipo: 'Ingreso',
      monto: 5000,
      origen: 'Cuota familiar',
      destino: 'Sanguchitos de miga',
      comentario: 'Pagado por familia Pérez'
    },
    {
      id: 2,
      fecha: '04/09/2025',
      tipo: 'Egreso',
      monto: 3200,
      origen: 'Venta de números',
      destino: 'Compra de útiles escolares',
      comentario: 'Se compraron cuadernos y lápices'
    },
    {
      id: 3,
      fecha: '05/09/2025',
      tipo: 'Egreso',
      monto: 2000,
      origen: 'Donación',
      destino: 'Mantenimiento aula informática',
      comentario: 'Pendiente ejecución'
    }
  ];

  get historialFiltrado() {

    const busqueda = this.textoBusqueda
      .toLowerCase()
      .replace(/\$/g, '')
      .trim();

    return this.historial.filter(registro => {

      const monto = registro.monto.toString();

      return (
        registro.tipo.toLowerCase().includes(busqueda) ||
        registro.origen.toLowerCase().includes(busqueda) ||
        registro.destino.toLowerCase().includes(busqueda) ||
        registro.comentario.toLowerCase().includes(busqueda) ||
        registro.fecha.toLowerCase().includes(busqueda) ||
        monto.includes(busqueda)
      );
    });
  }

  constructor() { }

  ngOnInit(): void {
  }
}