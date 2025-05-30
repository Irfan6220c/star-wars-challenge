import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { errorInterceptor } from './app/providers/interceptors/error.interceptor';
import { loadingInterceptor } from './app/providers/interceptors/loading.interceptor';
import { REST_SERVICE_PROVIDERS } from './app/providers/rest-service.providers';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(
      withInterceptors([
        loadingInterceptor,
        errorInterceptor
      ])
    ),
    provideRouter(routes),
    provideAnimations(),
    ...REST_SERVICE_PROVIDERS
  ]
}).catch(err => console.error(err));
