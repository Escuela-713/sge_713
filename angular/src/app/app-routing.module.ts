import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CarrerasComponent } from './pages/carreras/carreras.component';
import { FormCarrerasComponent } from './forms/form-carreras/form-carreras.component';
import { PlanesComponent } from './pages/planes/planes.component';
import { MateriasComponent } from './pages/materias/materias.component';
import { FormMateriasComponent } from './forms/form-materias/form-materias.component';
import { FormPlanesComponent } from './forms/form-planes/form-planes.component';
import { DatosPersonalesComponent } from './pages/DatosPersonales/Pantallas/PantallaPrincipal/datos-personales.component';
import { PantallaDatosAlumnoComponent } from './pages/DatosPersonales/Pantallas/pantalla-datos-alumno/pantalla-datos-alumno.component';
import { PantallaDatosTutoresComponent } from './pages/DatosPersonales/Pantallas/pantalla-datos-tutores/pantalla-datos-tutores.component';
import { PantallaDatosPersonalesComponent } from './pages/DatosPersonales/Pantallas/pantalla-datos-personales/pantalla-datos-personales.component';
import { PantallaNavegacionComponent } from './pages/DatosPersonales/Pantallas/pantalla-navegacion/pantalla-navegacion.component';

const routes: Routes = [
  {path:"home" , component:HomeComponent
  },
  {path:"dashboard" , component:DashboardComponent,
  children: [
    {path:"carreras", component:CarrerasComponent },
    {path:"planes", component:PlanesComponent},
    {path:"editarPlanes", component:FormPlanesComponent},
    {path:"materias", component:MateriasComponent},
    {path:"editarMaterias",component:FormMateriasComponent},
    {path:"DatosPersonalesPantalla",component:DatosPersonalesComponent},
    {path:"DatosAlumno",component:PantallaDatosAlumnoComponent},
    {path:"DatosTutores",component:PantallaDatosTutoresComponent},
    {path:"DatosPersonales",component:PantallaDatosPersonalesComponent}, 
    {path:"AgregarAlumno",component:PantallaNavegacionComponent}


  ] },
  { path: '',   redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
