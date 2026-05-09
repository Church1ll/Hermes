import { APP_INITIALIZER, ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHermes } from 'hermes';
import { initHermesExternalSources } from './hermes.external';
import { hermesOptions } from './hermes.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(), 
    provideRouter(routes),
    ...provideHermes(hermesOptions),
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: () => () => initHermesExternalSources(),
    },
  ],
};
