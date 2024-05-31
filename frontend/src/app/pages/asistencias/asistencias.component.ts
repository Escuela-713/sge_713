import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/servicios/data.service';


@Component({
  selector: 'app-asistencias',
  templateUrl: './asistencias.component.html',
  styleUrls: ['./asistencias.component.css']
})
export class AsistenciasComponent implements OnInit {
  informacionEstudiante: any;
  constructor(private dataService:DataService){}

  ngOnInit(): void{
    this.dataService.ObtenerAsistencias().subscribe(
      data => {console.log(data["informacion"]);
      this.informacionEstudiante=data["informacion"];
    }
    )
  }
}

