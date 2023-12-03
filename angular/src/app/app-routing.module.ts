import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CarrerasComponent } from './pages/carreras/carreras.component';
import { FormCarrerasComponent } from './pages/carreras/form-carreras/form-carreras.component';
import { MateriasComponent } from './pages/materias/materias.component';
import { FormMateriasComponent } from './pages/materias/form-materias/form-materias.component';
import { FormPlanesComponent } from './pages/planes/form-planes/form-planes.component';
import { DatosPersonalesComponent } from './pages/datos-personales/pantallas/pantalla-principal/datos-personales.component';
import { PantallaDatosAlumnoComponent } from './pages/datos-personales/pantallas/pantalla-datos-alumno/pantalla-datos-alumno.component';
import { PantallaDatosTutoresComponent } from './pages/datos-personales/pantallas/pantalla-datos-tutores/pantalla-datos-tutores.component';
import { PantallaDatosPersonalesComponent } from './pages/datos-personales/pantallas/pantalla-datos-personales/pantalla-datos-personales.component';
import { PlanesComponent } from './pages/planes/planes.component';
import { CalificadorComponent } from './pages/datos-academicos/calificador/calificador.component';
import { DatosAcademicosComponent } from './pages/datos-academicos/datos-academicos.component';
import { AnaliticoComponent } from './pages/datos-academicos/analitico/analitico.component';
import { AsistenciasComponent } from './pages/asistencias/asistencias.component';
import { MostrarFormulariosComponent } from './pages/datos-personales/pantallas/mostrar-formularios/mostrar-formularios.component';

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
    {path:"DatosPersonalesPantalla",component:DatosPersonalesComponent},
    {path:"DatosAlumno",component:PantallaDatosAlumnoComponent},
    {path:"DatosTutores",component:PantallaDatosTutoresComponent},
    {path:"DatosPersonales",component:PantallaDatosPersonalesComponent},
    {path:"MostrarFormulariosDatosPersonales",component:MostrarFormulariosComponent},

    {path:"asistencias", component:AsistenciasComponent}, 
    {path:"DatosAcademicos", component:DatosAcademicosComponent,
    children:[
      {path:"analitico", component:AnaliticoComponent},
      {path:"calificador", component: CalificadorComponent},]},
    ]}, 
  { path: '',   redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
