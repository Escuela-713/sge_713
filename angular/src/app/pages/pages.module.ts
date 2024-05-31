import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CarrerasComponent } from './carreras/carreras.component';
import { PlanesComponent } from './planes/planes.component';
import { MateriasComponent } from './materias/materias.component';
import { DatosPersonalesComponent } from './datos-personales/pantallas/pantalla-principal/datos-personales.component';
import { PantallaDatosAlumnoComponent } from './datos-personales/pantallas/pantalla-datos-alumno/pantalla-datos-alumno.component';
import { PantallaDatosTutoresComponent } from './datos-personales/pantallas/pantalla-datos-tutores/pantalla-datos-tutores.component';
import { PantallaDatosPersonalesComponent } from './datos-personales/pantallas/pantalla-datos-personales/pantalla-datos-personales.component';
import { DatosDomicilioComponent } from './datos-personales/componentes/datos-domicilio/datos-domicilio.component';
import { DatosLocalidadComponent } from './datos-personales/componentes/datos-localidad/datos-localidad.component';
import { DatosEscolaresComponent } from './datos-personales/componentes/datos-escolares/datos-escolares.component';
import { DatosIdentidadComponent } from './datos-personales/componentes/datos-identidad/datos-identidad.component';
import { DatosTutoresComponent } from './datos-personales/componentes/datos-tutores/datos-tutores.component';
import { CalificadorComponent } from './datos-academicos/calificador/calificador.component';
import { DatosAcademicosComponent } from './datos-academicos/datos-academicos.component';
import { AnaliticoComponent } from './datos-academicos/analitico/analitico.component';
import { AsistenciasComponent } from './asistencias/asistencias.component';
import { BuscarEstudianteComponent } from './datos-academicos/componentes/buscar-estudiante/buscar-estudiante.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormCarrerasComponent } from './carreras/form-carreras/form-carreras.component';
import { FormPlanesComponent } from './planes/form-planes/form-planes.component';
import { FormMateriasComponent } from './materias/form-materias/form-materias.component';

import { MostrarFormulariosComponent } from './datos-personales/pantallas/mostrar-formularios/mostrar-formularios.component';
import { HttpClientModule } from '@angular/common/http';

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
    DatosEscolaresComponent,
    CalificadorComponent,
    DatosIdentidadComponent,
    DatosTutoresComponent,
    DatosAcademicosComponent,
    AnaliticoComponent,
    BuscarEstudianteComponent,
    AsistenciasComponent,
    FormCarrerasComponent,
    FormPlanesComponent,
    FormMateriasComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports:
  [HomeComponent]
})
export class PagesModule { }
