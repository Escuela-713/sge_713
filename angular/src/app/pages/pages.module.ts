import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CarrerasComponent } from './carreras/carreras.component';
import { MateriasComponent } from './materias/materias.component';

@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    CarrerasComponent,
    MateriasComponent
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
