import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CarrerasComponent } from './carreras/carreras.component';
<<<<<<< HEAD
import { DatosPersonalesComponent } from './datos-personales/datos-personales.component';
=======
import { PlanesComponent } from './planes/planes.component';
import { MateriasComponent } from './materias/materias.component';
>>>>>>> fa983c99d9bb2ce690f6bc7e23bb7eed7a37d4e7

@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    CarrerasComponent,
<<<<<<< HEAD
    DatosPersonalesComponent
=======
    PlanesComponent,
    MateriasComponent
>>>>>>> fa983c99d9bb2ce690f6bc7e23bb7eed7a37d4e7
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports:
  [HomeComponent]
})
export class PagesModule { }
