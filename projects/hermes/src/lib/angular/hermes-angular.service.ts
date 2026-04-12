import { Inject, Injectable } from '@angular/core';
import { HermesBus } from '../core/bus';
import { TopicMap } from '../core/types';
import { HERMES_BUS } from './provide-hermes';

@Injectable({ providedIn: 'root' })
export class HermesAngularService<TTopics extends TopicMap = TopicMap> {
  constructor(@Inject(HERMES_BUS) private readonly bus: HermesBus<TTopics>) {}

  get instance(): HermesBus<TTopics> {
    return this.bus;
  }
}