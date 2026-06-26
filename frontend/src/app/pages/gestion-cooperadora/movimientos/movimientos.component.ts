import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CooperadoraMovimientosService } from 'src/app/services/cooperadora-movimientos.service';

@Component({
  selector: 'app-movimientos',
  standalone: true,
  imports: [CurrencyPipe],  
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.css']
})
export class MovimientosComponent {
  movimientos:any; 

  constructor(private movimientosService: CooperadoraMovimientosService) {
    this.movimientosService.getMovimientos().subscribe({
      next: (data) => {
        this.movimientos = data;
      },
      error: (error) => {
        console.error('Error al obtener los movimientos:', error);
      }

    })  
  


    
  }

}
