import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
@Component({
  selector: 'app-form-carreras',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './form-carreras.component.html',
  styleUrls: ['./form-carreras.component.css']
})
export class FormCarreraComponent  {
  
  carreraForm = this.formBuilder.group({
    nombre:['', [Validators.required]],
    titulo:['', [Validators.required]],
    carrera:['', [Validators.required]],
  })

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  guardarCarrera(){
    if (this.carreraForm.valid)
    {
      //llamar al backend para crear un nuevo plan
      //navegar a la pagina de gestion de planes
    }
    else
    {
      alert("Datos no validos")
    }
  }

  get nombre()
  {
    return this.carreraForm.controls["nombre"];
  }
  get titulo()
  {
    return this.carreraForm.controls["titulo"];
  }
  get carrera()
  {
    return this.carreraForm.controls["carrera"];
  }
}