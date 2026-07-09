import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { routes } from './app.routes';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes,withComponentInputBinding()), 
    provideHttpClient(),
  ]
};
