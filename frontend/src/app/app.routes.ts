import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { CarrerasComponent } from './pages/gestion-carreras-planes-materias/carreras/carreras.component';
import { PlanesComponent } from './pages/gestion-carreras-planes-materias/planes/planes.component';
import { FormCarrerasComponent } from './pages/gestion-carreras-planes-materias/carreras/componentes/form-carreras.component';
import { FormPlanesComponent } from './pages/gestion-carreras-planes-materias/planes/componentes/form-planes.component';
import { MateriasComponent } from './pages/gestion-carreras-planes-materias/materias/materias.component';
import { FormMateriasComponent } from './pages/gestion-carreras-planes-materias/materias/componentes/form-materias.component';
import { DatosPersonalesComponent } from './pages/gestion-datos-personales/datos-personales.component';
import { EditarDatosPersonalesComponent } from './pages/gestion-datos-personales/editar-datos-personales/editar-datos-personales.component';
import { DatosAcademicosComponent } from './pages/gestion-datos-academicos/datos-academicos.component';
import { AnaliticoComponent } from './pages/gestion-datos-academicos/analitico/analitico.component';
import { CalificadorComponent } from './pages/gestion-datos-academicos/calificador/calificador.component';
import { BuscarEstudianteComponent } from './pages/gestion-datos-academicos/componentes/buscar-estudiante/buscar-estudiante.component';
import { LoginComponent } from './pages/gestion-usuarios/login/login.component';
import { DatosTutoresComponent } from './pages/gestion-datos-personales/componentes/datos-tutores/datos-tutores.component';
import { EditarAgregarTutorComponent } from './pages/gestion-datos-personales/editar-agregar-tutor/editar-agregar-tutor.component';
import { FiltroDatosPersonalesComponent } from './pages/gestion-datos-personales/filtro-datos-personales/filtro-datos-personales.component';
import { RegistroComponent } from './pages/gestion-usuarios/registro/registro.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'carreras', component: CarrerasComponent },
      { path: 'planes', component: PlanesComponent },
      { path: 'editar-carreras', component: FormCarrerasComponent },
      { path: 'editar-planes', component: FormPlanesComponent },
      { path: 'materias', component: MateriasComponent },
      { path: 'editar-materias', component: FormMateriasComponent },

      { path: 'datos-tutor-editar', component: EditarAgregarTutorComponent },
      { path: 'filtro', component: FiltroDatosPersonalesComponent },

      { path: 'datos-personales', component: DatosPersonalesComponent },
      {
        path: 'editar-datos-personales',
        component: EditarDatosPersonalesComponent,
      },
      { path: 'editar-datos-tutores', component: DatosTutoresComponent },
      {path:"analitico", component:AnaliticoComponent},
      {
        path: 'datos-academicos',
        component: DatosAcademicosComponent,
        children: [
          {
            path: 'calificador',
            component: CalificadorComponent,
            children: [
              { path: 'buscador', component: BuscarEstudianteComponent },
            ],
          },
        ],
      },
    ],
  },
  { path: 'iniciar-sesion', component: LoginComponent },
  {path: "registro",component: RegistroComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
