import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
@Component({
  selector: 'app-form-planes',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './form-planes.component.html',
  styleUrls: ['./form-planes.component.css']
})
export class FormPlanesComponent implements OnInit {

  planForm = this.formBuilder.group({
    plan:['', [Validators.required]],
    hsCatedra:['', [Validators.required]],
    hsReloj:['', [Validators.required]],
  })
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }
  guardarPlan(){
    if (this.planForm.valid)
    {
      //llamar al backend para crear un nuevo plan
      //navegar a la pagina de gestion de planes
    }
    else
    {
      alert("Datos no validos")
    }
  }

  get plan()
  {
    return this.planForm.controls["plan"];
  }
  get hsCatedras()
  {
    return this.planForm.controls["hsCatedra"];
  }
  get hsReloj()
  {
    return this.planForm.controls["hsReloj"];
  }
}
