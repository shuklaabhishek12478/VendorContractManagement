import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';


import { MatSnackBar } from '@angular/material/snack-bar';
export const appConfig: ApplicationConfig = {
  providers: [
  provideBrowserGlobalErrorListeners(),
  provideRouter(routes),

  provideAnimations(),
  provideHttpClient(
    withInterceptors([
      authInterceptor
    ])
  )
]
};
