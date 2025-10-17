import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-movimientos',
  standalone: true,
  imports: [CurrencyPipe],   // 👈 acá agregás el pipe
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.css']
})
export class MovimientosComponent {
  movimientos = [
    { fecha: '03/09/2025', tipo: 'Ingreso', monto: 5000, origen: 'Cuota familiar', destino: 'Sanguchitos de miga', comentario: 'Pagado por familia Pérez' },
    { fecha: '04/09/2025', tipo: 'Egreso', monto: 3200, origen: 'Venta de números', destino: 'Compra útiles escolares', comentario: 'Se compraron cuadernos y lápices' },
    { fecha: '05/09/2025', tipo: 'Ingreso', monto: 1500, origen: 'Donación', destino: 'Sanguchitos de miga', comentario: 'Donación anónima' },
    { fecha: '06/09/2025', tipo: 'Egreso', monto: 2000, origen: 'Venta de números', destino: 'Pago a proveedores', comentario: 'Pago a Proveedor X' }
  ];

  balance: number = 0;

  nuevoMovimiento = { tipo: 'Ingreso', monto: 0 };

  constructor() {
    this.calcularBalance();
  }

  calcularBalance() {
    this.balance = this.movimientos.reduce((acc, mov) => {
      return mov.tipo === 'Ingreso' ? acc + mov.monto : acc - mov.monto;
    }, 0);
  }

  agregarMovimiento() {
    if (this.nuevoMovimiento.monto > 0) {
      const nuevo = {
        fecha: new Date().toLocaleDateString(),
        tipo: this.nuevoMovimiento.tipo,
        monto: this.nuevoMovimiento.monto,
        origen: 'Manual',
        destino: 'N/A',
        comentario: 'Agregado desde Movimientos'
      };
      this.movimientos.push(nuevo);
      this.calcularBalance();
      this.nuevoMovimiento.monto = 0;
    }
  }
}
