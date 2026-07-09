import { Routes } from "@angular/router";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { EditarEventoComponent } from "./pages/donar-713/componentes/editar-evento/editar-evento.component";
import { Donar713Component } from "./pages/donar-713/donar-713.component";
import { DonarHomeComponent } from "./pages/donar-713/donar-home/donar-home.component";
import { CarrerasComponent } from "./pages/gestion-carreras-planes-materias/carreras/carreras.component";
import { FormCarreraComponent } from "./pages/gestion-carreras-planes-materias/carreras/componentes/form-carreras.component";
import { FormMateriasComponent } from "./pages/gestion-carreras-planes-materias/materias/componentes/form-materias.component";
import { MateriasComponent } from "./pages/gestion-carreras-planes-materias/materias/materias.component";
import { FormPlanesComponent } from "./pages/gestion-carreras-planes-materias/planes/componentes/form-planes.component";
import { PlanesComponent } from "./pages/gestion-carreras-planes-materias/planes/planes.component";
import { HistorialComponent } from "./pages/gestion-cooperadora/historial/historial.component";
import { MovimientosComponent } from "./pages/gestion-cooperadora/movimientos/movimientos.component";
import { FormularioComponent } from "./pages/gestion-cooperadora/registrar-compra/formulario.component";
import { DatosTutoresComponent } from "./pages/gestion-datos-personales/componentes/datos-tutores/datos-tutores.component";
import { EditarAgregarTutorComponent } from "./pages/gestion-datos-personales/editar-agregar-tutor/editar-agregar-tutor.component";
import { EditarDatosPersonalesComponent } from "./pages/gestion-datos-personales/editar-datos-personales/editar-datos-personales.component";
import { FiltroDatosPersonalesComponent } from "./pages/gestion-datos-personales/filtro-datos-personales/filtro-datos-personales.component";
import { CreacionDeMesaComponent } from "./pages/gestion-examenes-finales/creacion-de-mesa/creacion-de-mesa.component";
import { InscripcionMesaComponent } from "./pages/gestion-examenes-finales/inscripcion-mesa/inscripcion-mesa.component";
import { MesasIndexComponent } from "./pages/gestion-examenes-finales/mesas-index";
import { MesasInicioComponent } from "./pages/gestion-examenes-finales/mesas-inicio/mesas-inicio";
import { TablaMesaExamenComponent } from "./pages/gestion-examenes-finales/tabla-mesa-examen/tabla-mesa-examen";
import { AgregarPosteoComponent } from "./pages/gestion-home/agregar-posteo/agregar-posteo.component";
import { AgregarSlideComponent } from "./pages/gestion-home/agregar-slide/agregar-slide.component";
import { EditarPosteoComponent } from "./pages/gestion-home/editar-posteo/editar-posteo.component";
import { GestionHomeComponent } from "./pages/gestion-home/gestion-home.component";
import { HomeDashboardComponent } from "./pages/gestion-home/home-dashboard/home-dashboard.component";
import { IncidenciasPendientesComponent } from "./pages/gestion-incidencias/incidencias-pendientes/incidencias-pendientes.component";
import { RegistroIncidenciaComponent } from "./pages/gestion-incidencias/registro-incidencia/registro-incidencia.component";
import { BienesRegistradosComponent } from "./pages/gestion-inventario/bienes-registrados/bienes-registrados.component";
import { InventarioComponent } from "./pages/gestion-inventario/inventario/inventario.component";
import { RegistrarBienComponent } from "./pages/gestion-inventario/registrar-bien/registrar-bien.component";
import { LoginComponent } from "./pages/gestion-usuarios/login/login.component";
import { RegistroComponent } from "./pages/gestion-usuarios/registro/registro.component";
import { HomeComponent } from "./pages/home/home.component";
import { NovedadComponent } from "./pages/novedad/novedad.component";

export const routes: Routes = [
  { path: "novedad/:slug", component: NovedadComponent },
  { path: "home", component: HomeComponent },
  {
    path: "donar-713",
    component: Donar713Component,
    children: [
      { path: "donar-home", component: DonarHomeComponent },
      { path: "editar-evento", component: EditarEventoComponent },
    ],
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    children: [
      { path: "cooperadora-movimientos", component: MovimientosComponent },
      { path: "cooperadora-historial", component: HistorialComponent },
      { path: "cooperadora-registro", component: FormularioComponent },
      { path: "carreras", component: CarrerasComponent },
      { path: "planes", component: PlanesComponent },
      { path: "editar-carreras", component: FormCarreraComponent },
      { path: "editar-planes", component: FormPlanesComponent },
      { path: "materias", component: MateriasComponent },
      { path: "editar-materias", component: FormMateriasComponent },
      { path: "datos-tutor-editar", component: EditarAgregarTutorComponent },
      { path: "filtro", component: FiltroDatosPersonalesComponent },
      { path: "datos-personales", component: EditarDatosPersonalesComponent },
      {
        path: "editar-datos-personales",
        component: EditarDatosPersonalesComponent,
      },
      { path: "editar-datos-tutores", component: DatosTutoresComponent },
      { path: "bienes-registrados", component: BienesRegistradosComponent },
      { path: "inventario", component: InventarioComponent },
      { path: "registrar-bien", component: RegistrarBienComponent },
      { path: "registro-incidencias", component: RegistroIncidenciaComponent },
      {
        path: "incidencias-pendientes",
        component: IncidenciasPendientesComponent,
      },
      {
        path: "home",
        component: GestionHomeComponent,
        children: [
          { path: "agregar-posteo", component: AgregarPosteoComponent },
          { path: "editar-novedad/:slug", component: EditarPosteoComponent },
          { path: "agregar-slide", component: AgregarSlideComponent },
          { path: "", component: HomeDashboardComponent, pathMatch: "full" },
        ],
      },
      { path: "inscripcion-mesa", component: InscripcionMesaComponent },
      { path: "crear-mesa", component: CreacionDeMesaComponent },
    ],
  },
  {
    path: "mesas-de-examenes",
    component: MesasIndexComponent,
    children: [
      {
        path: "inicio",
        component: MesasInicioComponent,
      },
      {
        path: "tabla",
        component: TablaMesaExamenComponent,
      },
      { path: "", component: MesasInicioComponent, pathMatch: "full" },
    ],
  },
  { path: "iniciar-sesion", component: LoginComponent },
  { path: "registro", component: RegistroComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
];
