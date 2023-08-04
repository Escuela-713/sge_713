import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CarrerasComponent } from './pages/carreras/carreras.component';
import { DatosPersonalesComponent } from './pages/datos-personales/datos-personales.component';

const routes: Routes = [
  {path:"home" , component:HomeComponent},
  {path:"dashboard" , component:DashboardComponent,
    children: [
      {path:"carreras", component:CarrerasComponent },
      {path:"datos-personales", component:DatosPersonalesComponent}
      
      ] },
  { path: '',   redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
