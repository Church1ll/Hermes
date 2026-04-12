import { APP_INITIALIZER, ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHermes } from 'hermes';
import { initHermesExternalSources } from './hermes.external';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(), 
    provideRouter(routes),
    ...provideHermes({
      topics: {
        'socket.orders': {
          replay: 50,
          crossTab: true,
          dedupeByMessageId: true,
        }
      },
      crossTab: { enabled: true, channelName: 'hermes-bus' },
    }),
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: () => () => initHermesExternalSources(),
    },
  ],
};
