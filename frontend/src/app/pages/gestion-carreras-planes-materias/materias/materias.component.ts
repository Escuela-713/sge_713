import { Component, OnInit } from '@angular/core';
import { MateriasService } from 'src/app/service/materias.service';

@Component({
  selector: 'app-materias',
  standalone: true,
  imports: [],
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent implements OnInit {
  materias:any;


  constructor(private MateriasService: MateriasService) { }

  ngOnInit(): void {
    this.MateriasService.obtenerMaterias().subscribe(
      {
        next: (data) => {
          this.materias=data;
         console.log(this.materias)
          
        },
        error:(err) => {
          alert("Se ha producido un error.Por favor, intente nuevamente");
         // console.error(err);

        }
      }
    )
  }

}
