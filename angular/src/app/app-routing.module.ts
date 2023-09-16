import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CarrerasComponent } from './pages/carreras/carreras.component';
import { FormCarrerasComponent } from './forms/form-carreras/form-carreras.component';
import { PlanesComponent } from './pages/planes/planes.component';
import { FormPlanesComponent } from './form/form-planes/form-planes.component';

const routes: Routes = [
  {path:"home" , component:HomeComponent
  },
  {path:"dashboard" , component:DashboardComponent,
  children: [
    {path:"carreras", component:CarrerasComponent },
    {path:"planes", component:PlanesComponent},
    {path:"editarPlanes", component:FormPlanesComponent}
    ] },
  { path: '',   redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
