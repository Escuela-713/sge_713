import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { CarrerasComponent } from './pages/gestion-carreras-planes-materias/carreras/carreras.component';
import { PlanesComponent } from './pages/gestion-carreras-planes-materias/planes/planes.component';
import { FormPlanesComponent } from './pages/gestion-carreras-planes-materias/planes/componentes/form-planes.component';
import { MateriasComponent } from './pages/gestion-carreras-planes-materias/materias/materias.component';
import { FormMateriasComponent } from './pages/gestion-carreras-planes-materias/materias/componentes/form-materias.component';
import { DatosPersonalesComponent } from './pages/gestion-datos-personales/datos-personales.component';
import { LoginComponent } from './pages/gestion-usuarios/login/login.component';
import { DatosTutoresComponent } from './pages/gestion-datos-personales/componentes/datos-tutores/datos-tutores.component';
import { EditarAgregarTutorComponent } from './pages/gestion-datos-personales/editar-agregar-tutor/editar-agregar-tutor.component';
import { FiltroDatosPersonalesComponent } from './pages/gestion-datos-personales/filtro-datos-personales/filtro-datos-personales.component';
import { RegistroComponent } from './pages/gestion-usuarios/registro/registro.component';
import { FormCarreraComponent } from './pages/gestion-carreras-planes-materias/carreras/componentes/form-carreras.component';
import { BienesRegistradosComponent } from './pages/gestion-inventario/bienes-registrados/bienes-registrados.component';
import { InventarioComponent } from './pages/gestion-inventario/inventario/inventario.component';
import { RegistrarBienComponent } from './pages/gestion-inventario/registrar-bien/registrar-bien.component';
import { RegistroIncidenciaComponent } from './pages/gestion-incidencias/registro-incidencia/registro-incidencia.component';
import { IncidenciasPendientesComponent } from './pages/gestion-incidencias/incidencias-pendientes/incidencias-pendientes.component';
import { GestionHomeComponent } from './pages/gestion-home/gestion-home.component';
import { AgregarPosteoComponent } from './pages/gestion-home/agregar-posteo/agregar-posteo.component';
import { EditarPosteoComponent } from './pages/gestion-home/editar-posteo/editar-posteo.component';
import { NovedadComponent } from './pages/novedad/novedad.component';

import { RegistroMesaExamenComponent } from './pages/gestion-examenes-finales/registro-mesa-examen/registro-mesa-examen.component';
import { HomeGestionComponent } from './pages/gestion-home/home/home.component';
import { HistorialComponent } from './pages/gestion-cooperadora/historial/historial.component';
import { FormularioComponent } from './pages/gestion-cooperadora/registrar-compra/formulario.component';
import { RegistroIngresosComponent } from './pages/gestion-cooperadora/registro-ingresos/registro-ingresos.component';
import { MovimientosComponent } from './pages/gestion-cooperadora/movimientos/movimientos.component';

export const routes: Routes = [
  { path: 'novedad/:slug', component: NovedadComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'cooperadora-movimientos', component: MovimientosComponent },
      { path: 'cooperadora-historial', component: HistorialComponent },
      { path: 'cooperadora-compra', component: FormularioComponent },
      { path: 'cooperadora-ingresos', component: RegistroIngresosComponent},
      { path: 'carreras', component: CarrerasComponent },
      { path: 'planes', component: PlanesComponent },
      { path: 'editar-carreras', component: FormCarreraComponent },
      { path: 'editar-planes', component: FormPlanesComponent },
      { path: 'materias', component: MateriasComponent },
      { path: 'editar-materias', component: FormMateriasComponent },
      { path: 'datos-tutor-editar', component: EditarAgregarTutorComponent },
      { path: 'filtro', component: FiltroDatosPersonalesComponent },
      { path: 'datos-personales', component: DatosPersonalesComponent },
      { path: 'editar-datos-tutores', component: DatosTutoresComponent },
      { path: 'bienes-registrados', component: BienesRegistradosComponent },
      { path: 'inventario', component: InventarioComponent },
      { path: 'registrar-bien', component: RegistrarBienComponent },
      {
        path: 'registro-incidencias', component: RegistroIncidenciaComponent,
      },
      {
        path: 'incidencias-pendientes', component: IncidenciasPendientesComponent
      },
      {
        path: "home",
        component: GestionHomeComponent,
        children: [
          { path: '', component: HomeGestionComponent, pathMatch: 'full' },
          { path: 'agregar-posteo', component: AgregarPosteoComponent },
          { path: 'editar-novedad/:slug', component: EditarPosteoComponent }
        ]
      },
      { path: 'registro-mesa', component: RegistroMesaExamenComponent },
    ],
  },
  { path: 'iniciar-sesion', component: LoginComponent },
  { path: "registro", component: RegistroComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
