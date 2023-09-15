import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CalificadorComponent } from './pages/calificador/calificador.component';
import { DatosAcademicosComponent } from './pages/datos-academicos/datos-academicos.component';
import { AnaliticoComponent } from './pages/analitico/analitico.component';

const routes: Routes = [
  {path:"home" , component:HomeComponent
  },
  {path:"dashboard" , component:DashboardComponent,
  children: [
    {path:"datos-academicos", component:DatosAcademicosComponent,
      children:[
        {path:"calificador", component: CalificadorComponent },
        {path:"analitico", component:AnaliticoComponent}
      ]}
    ] },
  { path: '',   redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
