import { inject } from '@angular/core';
import { HERMES_BUS, LeaderElector, ExternalSourceManager } from 'hermes';
import type { HermesBus } from 'hermes';
import { AppTopics } from './topics';

let initialized = false;

export function initHermesExternalSources(): void {
  if (initialized) return;
  initialized = true;

  const bus = inject(HERMES_BUS) as HermesBus<AppTopics>;

  const elector = new LeaderElector('hermes-leader');
  const sources = new ExternalSourceManager(bus, elector);

  sources.registerLeaderOnlySource('socket.orders', ({ emit }) => {
    console.log('[Hermes Demo] Opening real WebSocket connection');

    const socket = new WebSocket(
      'wss://free.blr2.piesocket.com/v3/1?api_key=yaeude3izyQVnWHecl0FSDhHeirzFiEjtOGoRYFH&notify_self=1'
    );

    socket.addEventListener('open', () => {
      console.log('[Hermes Demo] WebSocket opened');
    });

    socket.addEventListener('message', (event) => {
      emit({ data: event.data });
    });

    socket.addEventListener('close', () => {
      console.log('[Hermes Demo] WebSocket closed');
    });

    return () => socket.close();
  });
}