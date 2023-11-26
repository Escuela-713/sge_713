import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/servicios/data.service';

@Component({
  selector: 'app-asistencias',
  templateUrl: './asistencias.component.html',
  styleUrls: ['./asistencias.component.css']
})
export class AsistenciasComponent implements OnInit {
  constructor(private dataService:DataService){}

  ngOnInit(): void{
    console.log("ola")
    console.log(this.dataService())
  }
}
