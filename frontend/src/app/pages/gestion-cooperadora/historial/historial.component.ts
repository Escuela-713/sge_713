import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  historial = [
    {id:1, fecha: '03/09/2025', tipo: 'Ingreso', monto: 5000, origen: 'Cuota familiar', destino: 'Sanguchitos de miga', comentario: 'Pagado por familia Pérez' },
    {id:2, fecha: '04/09/2025', tipo: 'Egreso', monto: 3200, origen: 'venta de numeros', destino: 'Compra útiles escolares',  comentario: 'Se compraron cuadernos y lápices' },
    {id:3, fecha: '05/09/2025', tipo: 'Egreso', monto: 2000, origen: 'donacion', destino: 'Mantenimiento aula informática', comentario: 'Pendiente ejecución' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  agregarRegistro() {
  }

}
