import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  historial = [
<<<<<<< HEAD
    { fecha: '03/09/2025', tipo: 'Ingreso', monto: 5000, origen: 'Cuota familiar', destino: '', utilizado: '', comentario: 'Pagado por familia Pérez'},
    { fecha: '04/09/2025', tipo: 'Egreso', monto: 3200, origen: '', destino: 'Compra útiles 3º grado', utilizado: 'Sí', comentario: 'Se compraron cuadernos y lápices' },
    { fecha: '05/09/2025', tipo: 'Egreso', monto: 2000, origen: '', destino: 'Mantenimiento aula informática', utilizado: 'No', comentario: 'Pendiente ejecución' }
=======
    {id:1, fecha: '03/09/2025', tipo: 'Ingreso', monto: 5000, origen: 'Cuota familiar', destino: 'Sanguchitos de miga', comentario: 'Pagado por familia Pérez' },
    {id:2, fecha: '04/09/2025', tipo: 'Egreso', monto: 3200, origen: 'venta de numeros', destino: 'Compra útiles escolares',  comentario: 'Se compraron cuadernos y lápices' },
    {id:3, fecha: '05/09/2025', tipo: 'Egreso', monto: 2000, origen: 'donacion', destino: 'Mantenimiento aula informática', comentario: 'Pendiente ejecución' }
>>>>>>> lautaro
  ];

  constructor() { }

  ngOnInit(): void {
  }

  agregarRegistro() {
  }

}
