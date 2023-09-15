import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscarEstudianteComponent } from './buscar-estudiante/buscar-estudiante.component';



@NgModule({
  declarations: [
    BuscarEstudianteComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[BuscarEstudianteComponent]
})
export class ComponentsModule { }
