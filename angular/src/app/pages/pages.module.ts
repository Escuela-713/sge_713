import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CarrerasComponent } from './carreras/carreras.component';
import { PlanesComponent } from './planes/planes.component';
import { MateriasComponent } from './materias/materias.component';
import { DatosPersonalesComponent } from './DatosPersonales/Pantallas/PantallaPrincipal/datos-personales.component';
import { PantallaDatosAlumnoComponent } from './DatosPersonales/Pantallas/pantalla-datos-alumno/pantalla-datos-alumno.component';
import { PantallaDatosTutoresComponent } from './DatosPersonales/Pantallas/pantalla-datos-tutores/pantalla-datos-tutores.component';
import { PantallaDatosPersonalesComponent } from './DatosPersonales/Pantallas/pantalla-datos-personales/pantalla-datos-personales.component';
import { DatosDomicilioComponent } from './DatosPersonales/Componentes/datos-domicilio/datos-domicilio.component';
import { DatosLocalidadComponent } from './DatosPersonales/Componentes/datos-localidad/datos-localidad.component';

@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    CarrerasComponent,
    PlanesComponent,
    MateriasComponent,
    DatosPersonalesComponent,
    PantallaDatosAlumnoComponent,
    PantallaDatosTutoresComponent,
    PantallaDatosPersonalesComponent,
    DatosDomicilioComponent,
    DatosLocalidadComponent,
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
