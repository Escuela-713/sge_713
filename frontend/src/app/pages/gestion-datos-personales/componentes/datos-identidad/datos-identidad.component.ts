import { Component } from '@angular/core';
import { DatosPeronalesService } from 'src/app/service/datos-personales.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-datos-identidad',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './datos-identidad.component.html',
  styleUrls: ['./datos-identidad.component.css']
})
export class DatosIdentidadComponent {
  datosIdentidadForm: FormGroup;
  datostutor: any;
  constructor(private serviciosge: DatosPeronalesService, private formBuilder: FormBuilder, private router: Router) {
    this.datosIdentidadForm = this.formBuilder.group({
      fechaNacimiento: ['', Validators.required],
      provinciaNacimiento: ['', Validators.required],
      localidadNacimiento: ['', Validators.required,],
      paisDomicilio: ['', Validators.required,],
      provinciaDomicilio: ['', Validators.required],
      localidadDomicilio: ['', Validators.required],
      barrio: ['', Validators.required,],
      calle: ['', Validators.required,],
      nroPiso: [''],
      nroDpto: [''],
      telefono: [''],
      mailAlumno: ['', [Validators.required, Validators.email]],
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