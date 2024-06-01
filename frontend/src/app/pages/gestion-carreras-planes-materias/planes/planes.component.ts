import { Component, OnInit } from '@angular/core';
import { PlanesService } from 'src/app/service/planes.service';
@Component({
  selector: 'app-planes',
  standalone: true,
  imports: [],
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
          this.planes=data["planes"];
          console.log("COMPONENTE PLANES")
        },
        error:(err)=>{
          alert("se ha producido un error. Por favor, intente nuevamente");
          console.error(err);
        }
      }
    )
  }

}
