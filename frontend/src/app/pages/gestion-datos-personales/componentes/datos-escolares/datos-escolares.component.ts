import { Component, OnInit } from '@angular/core';
import { DatosPeronalesService } from 'src/app/service/datos-personales.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-datos-escolares',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './datos-escolares.component.html',
  styleUrls: ['./datos-escolares.component.css']
})
export class DatosEscolaresComponent {
  datosEscolaresForm: FormGroup;
  datostutor: any;
  constructor(private serviciosge: DatosPeronalesService, private formBuilder: FormBuilder, private router: Router) {
    this.datosEscolaresForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', Validators.required],
      cuil: ['', Validators.required,],
      genero: ['', Validators.required],
      legajo: ['', Validators.required],
      fechaIngreso: ['', Validators.required],
      NroLibroMatriz: ['', Validators.required],
      fechaEgreso: ['', Validators.required]
    });
    this.serviciosge.obtenerdatosTutor().subscribe(
      {
        next: (data) => {
          this.datostutor = data["datosTutor"];
          console.log("datosTutor");
          console.log(this.datostutor);
        },
        error: (err) => {
          alert("Se ha producido un error. Por favor, intente nuevamente.");
          console.error(err)
        }
      }
    )
  }
}
