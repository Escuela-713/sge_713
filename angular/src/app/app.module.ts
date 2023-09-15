import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { PagesModule } from './pages/pages.module';
import { FormMateriasComponent } from './forms/form-materias/form-materias.component';
import { FormPlanesComponent } from './forms/form-planes/form-planes.component';



@NgModule({
  declarations: [
    AppComponent,
    FormPlanesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    PagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
