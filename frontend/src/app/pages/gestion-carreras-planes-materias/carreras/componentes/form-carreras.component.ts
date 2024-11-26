import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
@Component({
  selector: 'app-form-carreras',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-carreras.component.html',
  styleUrls: ['./form-carreras.component.css']
})
export class FormCarreraComponent  {
  
  carreraForm = this.formBuilder.group({
    nombre:['', [Validators.required]],
    titulo:['', [Validators.required]],
    descripcion:['', [Validators.required]],
  })

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  guardarCarrera(event:Event){
    if (this.carreraForm.valid)
    {
      alert("datos valido")
      //llamar al backend para crear un nuevo plan
      //navegar a la pagina de gestion de planes
    }
    else
    {
      alert("Datos no validos")
    }
  }

  get Nombre()
  {
    return this.carreraForm.controls["nombre"];
  }
  get Titulo()
  {
    return this.carreraForm.controls["titulo"];
  }
  get Descripcion()
  {
    return this.carreraForm.controls["descripcion"];
  }
}