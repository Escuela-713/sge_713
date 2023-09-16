import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormCarrerasComponent } from './form-carreras/form-carreras.component';
import { FormPlanesComponent } from './form-planes/form-planes.component';
import { FormMateriasComponent } from './form-materias/form-materias.component';


@NgModule({
  declarations: [
    FormCarrerasComponent,
    FormPlanesComponent,
    FormMateriasComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    FormPlanesComponent,
    FormCarrerasComponent,
    FormMateriasComponent
  ]
})
export class FormsModule { }
