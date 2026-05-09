import { Component, inject } from '@angular/core';
import { HERMES_BUS, HermesBus } from 'hermes';
import { AppTopics } from '../../../../topics';

@Component({
  selector: 'app-counter-producer',
  imports: [],
  templateUrl: './counter-producer.html',
  styleUrl: './counter-producer.scss',
})
export class CounterProducer {
  private readonly bus = inject(HERMES_BUS) as HermesBus<AppTopics>;
  counter = 0;

  increment(): void {
    this.counter++;
    this.bus.publish('counter', { value: this.counter });
  }

  decrement(): void {
    this.counter--;
    this.bus.publish('counter', { value: this.counter });
  }
}
