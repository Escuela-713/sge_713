import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CalificadorComponent } from './calificador/calificador.component';
import { DatosAcademicosComponent } from './datos-academicos/datos-academicos.component';
import { BuscarEstudianteComponent } from '../components/buscar-estudiante/buscar-estudiante.component';
import { ComponentsModule } from '../components/components.module';
import { AnaliticoComponent } from './analitico/analitico.component';

@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    CalificadorComponent,
    DatosAcademicosComponent,
    AnaliticoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ComponentsModule
  ],
  exports:
  [HomeComponent]
})
export class PagesModule { }
