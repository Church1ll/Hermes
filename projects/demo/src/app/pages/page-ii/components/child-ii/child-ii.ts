import { Component, inject } from '@angular/core';
import { HERMES_BUS, HermesAngularService, HermesBus, createAngularScope } from 'hermes';
import { AppTopics } from '../../../../topics';

@Component({
  selector: 'app-child-ii',
  imports: [],
  templateUrl: './child-ii.html',
  styleUrl: './child-ii.scss',
})
export class ChildII {
  counter: number = 0;
  private readonly hermes = inject(HERMES_BUS) as HermesBus<AppTopics>;
  private readonly scope = createAngularScope();

  constructor() {
    this.hermes.subscribe(
      'counter',
      (payload) => {
        console.log('received chat message', payload);
        this.counter = payload['counter'];
      },
      { scope: this.scope }
    );
  }

  ngOnDestroy(): void {
    console.log("Destroyed Child 2");
  }
}
