import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
@Component({
  selector: 'app-form-materias',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-materias.component.html',
  styleUrls: ['./form-materias.component.css']
})
export class FormMateriasComponent {

  MateriasForm = this.formBuilder.group({
    nombremateria:['', [Validators.required]],
    añomateria:['', [Validators.required]],
    hssemanales:['', [Validators.required]],
    hsrelojanuales:['', [Validators.required]],
  })
  materiasForm: any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }
  guardarMaterias(event:Event){
    if (this.MateriasForm.valid)
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

  get Materia()
  {
    return this.materiasForm.controls["nombre de la materia"];
  }
  get Año()
  {
    return this.materiasForm.controls["año de la materia"];
  }
  get HsSemanales()
  {
    return this.materiasForm.controls["horas semanales"];
  }
  get HsRelojAnuales()
  {
    return this.materiasForm.controls["hora reloj anuales"];
  }
}


