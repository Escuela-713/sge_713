import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { PagesModule } from './pages/pages.module';
import { FormPlanesComponent } from './form/form-planes/form-planes.component';
import { FormMateriasComponent } from './forms/form-materias/form-materias.component';

@NgModule({
  declarations: [
    AppComponent,
    FormPlanesComponent,
    FormMateriasComponent
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
