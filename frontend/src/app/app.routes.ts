import type { Route, Routes } from '@angular/router'
import { DashboardComponent } from '@pages/dashboard/dashboard.component'
import { EditarEventoComponent } from '@pages/donar-713/componentes/editar-evento/editar-evento.component'
import { Donar713Component } from '@pages/donar-713/donar-713.component'
import { DonarHomeComponent } from '@pages/donar-713/donar-home/donar-home.component'
import { CarrerasComponent } from '@pages/gestion-carreras-planes-materias/carreras/carreras.component'
import { FormCarreraComponent } from '@pages/gestion-carreras-planes-materias/carreras/componentes/form-carreras.component'
import { FormMateriasComponent } from '@pages/gestion-carreras-planes-materias/materias/componentes/form-materias.component'
import { MateriasComponent } from '@pages/gestion-carreras-planes-materias/materias/materias.component'
import { FormPlanesComponent } from '@pages/gestion-carreras-planes-materias/planes/componentes/form-planes.component'
import { PlanesComponent } from '@pages/gestion-carreras-planes-materias/planes/planes.component'
import { HistorialComponent } from '@pages/gestion-cooperadora/historial/historial.component'
import { MovimientosComponent } from '@pages/gestion-cooperadora/movimientos/movimientos.component'
import { FormularioComponent } from '@pages/gestion-cooperadora/registrar-compra/formulario.component'
import { DatosTutoresComponent } from '@pages/gestion-datos-personales/componentes/datos-tutores/datos-tutores.component'
import { EditarAgregarTutorComponent } from '@pages/gestion-datos-personales/editar-agregar-tutor/editar-agregar-tutor.component'
import { EditarDatosPersonalesComponent } from '@pages/gestion-datos-personales/editar-datos-personales/editar-datos-personales.component'
import { FiltroDatosPersonalesComponent } from '@pages/gestion-datos-personales/filtro-datos-personales/filtro-datos-personales.component'
import { CreacionDeMesaComponent } from '@pages/gestion-examenes-finales/creacion-de-mesa/creacion-de-mesa.component'
import { TablaMesaExamenComponent } from '@pages/gestion-examenes-finales/tabla-mesa-examen/tabla-mesa-examen'
import { AgregarPosteoComponent } from '@pages/gestion-home/agregar-posteo/agregar-posteo.component'
import { AgregarSlideComponent } from '@pages/gestion-home/agregar-slide/agregar-slide.component'
import { EditarPosteoComponent } from '@pages/gestion-home/editar-posteo/editar-posteo.component'
import { GestionHomeComponent } from '@pages/gestion-home/gestion-home.component'
import { HomeDashboardComponent } from '@pages/gestion-home/home-dashboard/home-dashboard.component'
import { IncidenciasPendientesComponent } from '@pages/gestion-incidencias/incidencias-pendientes/incidencias-pendientes.component'
import { RegistroIncidenciaComponent } from '@pages/gestion-incidencias/registro-incidencia/registro-incidencia.component'
import { InventarioComponent } from '@pages/gestion-inventario/inventario/inventario.component'
import { RegistrarBienComponent } from '@pages/gestion-inventario/registrar-bien/registrar-bien.component'
import { LoginComponent } from '@pages/gestion-usuarios/login/login.component'
import { RegistroComponent } from '@pages/gestion-usuarios/registro/registro.component'
import { HomeComponent } from '@pages/home/home.component'
import { NovedadComponent } from '@pages/novedad/novedad.component'
import { authGuard } from '@guards/auth.guard'

const indexarRuta = (componenteIndex: any): Route => {
  const rutaIndex: Route = { path: '', component: componenteIndex, pathMatch: 'full' }

  return rutaIndex
}

export const routes: Routes = [
  { path: 'novedad/:id', component: NovedadComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'donar-713',
    component: Donar713Component,
    children: [
      { path: 'donar-home', component: DonarHomeComponent },
      { path: 'editar-evento', component: EditarEventoComponent },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'cooperadora',
        children: [
          { path: 'movimientos', component: MovimientosComponent },
          { path: 'historial', component: HistorialComponent },
          { path: 'registro', component: FormularioComponent },
        ]
      },
      {
        path: 'carreras',
        children: [
          indexarRuta(CarrerasComponent),
          { path: 'editar', component: FormCarreraComponent },
        ]
      },
      {
        path: 'planes',
        children: [
          indexarRuta(PlanesComponent),
          { path: 'editar', component: FormPlanesComponent },
        ]
      },
      {
        path: 'materias',
        children: [
          indexarRuta(MateriasComponent),
          { path: 'editar', component: FormMateriasComponent },
        ]
      },
      {
        path: 'datos-tutores',
        children: [
          indexarRuta(DatosTutoresComponent),
          { path: 'editar/:id_tutor', component: EditarAgregarTutorComponent },
        ]
      },
      {
        path: 'datos-personales',
        children: [
          { path: 'filtro', component: FiltroDatosPersonalesComponent },
          { path: 'editar/:id_persona', component: EditarDatosPersonalesComponent },
        ]
      },
      {
        path: 'inventario',
        children: [
          indexarRuta(InventarioComponent),
          { path: 'registrar', component: RegistrarBienComponent },
        ]
      },
      {
        path: 'incidencias',
        children: [
          indexarRuta(IncidenciasPendientesComponent),
          { path: 'registrar', component: RegistroIncidenciaComponent },
        ]
      },
      {
        path: 'home',
        component: GestionHomeComponent,
        children: [
          indexarRuta(HomeDashboardComponent),
          { path: 'agregar-posteo', component: AgregarPosteoComponent },
          { path: 'editar-novedad/:id', component: EditarPosteoComponent },
          { path: 'agregar-slide', component: AgregarSlideComponent },
        ],
      },
      {
        path: 'mesas-de-examenes',
        children: [
          indexarRuta(TablaMesaExamenComponent),
          { path: 'crear-mesa', component: CreacionDeMesaComponent },
        ],
      },
    ],
  },
  { path: 'iniciar-sesion', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
]
