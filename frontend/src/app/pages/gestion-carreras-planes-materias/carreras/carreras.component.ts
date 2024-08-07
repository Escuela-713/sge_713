import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarrerasService } from 'src/app/service/carreras.service';

@Component({
  selector: 'app-carreras',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink],
  templateUrl: './carreras.component.html',
  styleUrls: ['./carreras.component.css']
})
export class CarrerasComponent implements OnInit {

  carreras:any;
  constructor(private CarrerasService: CarrerasService) {}

  ngOnInit(): void {
    this.CarrerasService.obtenerCarreras().subscribe(
      {
        next: (data) => {
          this.carreras=data["carreras"];
          console.log("COMPONENTE CARRERAS")
          
        },
        error:(err) => {
          alert("Se ha producido un error.Por favor, intente nuevamente");
          console.error(err);

        }
      }
    )
  }
}
