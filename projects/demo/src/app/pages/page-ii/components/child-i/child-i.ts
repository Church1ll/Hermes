import { Component, inject, OnDestroy } from '@angular/core';
import { createAngularScope, HERMES_BUS, HermesAngularService, HermesBus } from 'hermes';
import { AppTopics } from '../../../../topics';

@Component({
  selector: 'app-child-i',
  imports: [],
  templateUrl: './child-i.html',
  styleUrl: './child-i.scss',
})
export class ChildI implements OnDestroy {
  counter: number = 0;
  private readonly hermes = inject(HERMES_BUS) as HermesBus<AppTopics>;
  private readonly scope = createAngularScope();

  increment() {
    this.counter++;
    this.updateTopic();
  }

  decrement() {
    this.counter--;
    this.updateTopic();
  }

  updateTopic() {
    this.hermes.publish('counter', { counter: this.counter });
  }

  ngOnDestroy(): void {
    console.log("Destroyed Child 1");
  }
}
