import { Component, inject } from '@angular/core';
import { createAngularScope, HERMES_BUS, HermesBus } from 'hermes';
import { AppTopics } from '../../../../topics';

@Component({
  selector: 'app-lifecycle-child',
  imports: [],
  templateUrl: './lifecycle-child.html',
  styleUrl: './lifecycle-child.scss',
})
export class LifecycleChild {
  private readonly bus = inject(HERMES_BUS) as HermesBus<AppTopics>;
  private readonly scope = createAngularScope();

  value = 0;

  constructor() {
    this.bus.subscribe(
      'lifecycle',
      (payload) => {
        this.value = payload.value;
      },
      { scope: this.scope },
    );
  }
}
