import { inject } from '@angular/core';
import { HERMES_BUS } from 'hermes';
import { LeaderElector, ExternalSourceManager } from 'hermes';
import type { HermesBus } from 'hermes';
import type { AppTopics } from './topics';

export function initHermesExternalSources() {
  const bus = inject(HERMES_BUS) as HermesBus<AppTopics>;

  const elector = new LeaderElector('hermes-leader');
  const sources = new ExternalSourceManager(bus, elector);

  sources.registerLeaderOnlySource('socket.orders', ({ emit }) => {
    const socket = new WebSocket('wss://free.blr2.piesocket.com/v3/1?api_key=yaeude3izyQVnWHecl0FSDhHeirzFiEjtOGoRYFH&notify_self=1');

    socket.addEventListener('message', (event) => {
      const payload = JSON.parse(event.data);
      emit(payload);
    });

    return () => socket.close();
  });
}