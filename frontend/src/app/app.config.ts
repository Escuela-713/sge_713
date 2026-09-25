import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { authInterceptor } from './interceptors/auth.interceptor';

import { routes } from './app.routes';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes,withComponentInputBinding()), 
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
  ]
};
