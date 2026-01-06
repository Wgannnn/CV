import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { App } from './app/app';
import { routes } from './app/app.routes';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { NoReuseStrategy } from './app/app';
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'top' })),
    { provide: RouteReuseStrategy, useClass: NoReuseStrategy },
    provideAnimations()
  ]

});
