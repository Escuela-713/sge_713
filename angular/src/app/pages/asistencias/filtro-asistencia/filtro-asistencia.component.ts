import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-filtro-asistencia',
  templateUrl: './filtro-asistencia.component.html',
  styleUrls: ['./filtro-asistencia.component.css']
})
export class FiltroAsistenciaComponent implements OnInit {
  asistenciaForm = this.formBuilder.group({
    modalidad:['', [Validators.required]],
    anio:['', [Validators.required , Validators.min(1), Validators.max(7)]],
    division:['', [Validators.required, Validators.min(1), Validators.max(4)]]
  })
    constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
  }

  get modalidad (): any{
    return this.asistenciaForm.get("modalidad")
  }

  buscarAlumno(){
    if (this.asistenciaForm.valid)
    {
      //busar al alumno
      alert("Formlario válido, llamar al backend");
    }
    else
    {
      alert("Formulario invalido, ingrese los datos necesarios");
      this.asistenciaForm.markAllAsTouched();
    }
  }

  get anio()
  {
    return this.asistenciaForm.controls["anio"];
  }


  get division(){
    return this.asistenciaForm.controls["division"];
  }

}
