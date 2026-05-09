import { Component, inject } from '@angular/core';
import { HERMES_BUS, HermesBus, createAngularScope } from 'hermes';
import { AppTopics } from '../../../../topics';

@Component({
  selector: 'app-counter-consumer',
  imports: [],
  templateUrl: './counter-consumer.html',
  styleUrl: './counter-consumer.scss',
})
export class CounterConsumer {
  private readonly bus = inject(HERMES_BUS) as HermesBus<AppTopics>;
  private readonly scope = createAngularScope();

  counter = 0;

  constructor() {
    this.bus.subscribe(
      'counter',
      (payload) => {
        this.counter = payload.value;
      },
      { scope: this.scope },
    );
  }
}
