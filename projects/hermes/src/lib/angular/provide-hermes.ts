import { InjectionToken, Provider } from '@angular/core';
import { createBus, HermesBus, BusOptions } from '../core/bus';
import { TopicMap } from '../core/types';

export const HERMES_OPTIONS = new InjectionToken<BusOptions<any>>('HERMES_OPTIONS');
export const HERMES_BUS = new InjectionToken<HermesBus<any>>('HERMES_BUS');

export function provideHermes<TTopics extends TopicMap>(
  options: BusOptions<TTopics> = {}
): Provider[] {
  return [
    {
      provide: HERMES_OPTIONS,
      useValue: options,
    },
    {
      provide: HERMES_BUS,
      useFactory: (resolvedOptions: BusOptions<TTopics>) =>
        createBus<TTopics>(resolvedOptions),
      deps: [HERMES_OPTIONS],
    },
  ];
}