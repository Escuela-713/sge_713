import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PlanesService } from 'src/app/service/planes.service';
@Component({
  selector: 'app-planes',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesComponent implements OnInit {
  
  planes:any;
  constructor(private PlanesSevice: PlanesService) { }

  ngOnInit(): void {
    this.PlanesSevice.obtenerPlanes().subscribe(
      {
        next: (data) => {
          this.planes=data;
          console.log(this.planes)
        },
        error:(err)=>{
          alert("se ha producido un error. Por favor, intente nuevamente");
          console.error(err);
        }
      }
    )
  }

}
