import { Component, OnInit } from '@angular/core';
import { CarrerasService } from 'src/app/service/carreras.service';

@Component({
  selector: 'app-carreras',
  standalone: true,
  imports: [],
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
          this.carreras=data["carrera"];
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
