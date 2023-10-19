import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CarrerasComponent } from './pages/carreras/carreras.component';
import { FormCarrerasComponent } from './forms/form-carreras/form-carreras.component';
import { PlanesComponent } from './pages/planes/planes.component';
import { MateriasComponent } from './pages/materias/materias.component';
import { FormMateriasComponent } from './forms/form-materias/form-materias.component';
import { DatosPersonalesComponent } from './pages/datos-personales/datos-personales.component';
import { FormPlanesComponent } from './forms/form-planes/form-planes.component';

const routes: Routes = [
  {path:"home" , component:HomeComponent
  },
  {path:"dashboard" , component:DashboardComponent,
  children: [
    {path:"carreras", component:CarrerasComponent },
    {path:"planes", component:PlanesComponent},
    {path:"editarCarreras", component:FormCarrerasComponent},
    {path:"editarPlanes", component:FormPlanesComponent},
    {path:"materias", component:MateriasComponent},
    {path:"editarMaterias",component:FormMateriasComponent},
    {path:"datos-personales", component:DatosPersonalesComponent}
    ] },
  { path: '',   redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
