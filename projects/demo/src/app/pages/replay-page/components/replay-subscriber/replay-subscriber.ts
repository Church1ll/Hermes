import { Component, inject } from '@angular/core';
import { HERMES_BUS, HermesBus, createAngularScope } from 'hermes';
import { AppTopics } from '../../../../topics';
import { MessageLog } from '../../../../shared/message-log/message-log';

@Component({
  selector: 'app-replay-subscriber',
  imports: [MessageLog],
  templateUrl: './replay-subscriber.html',
  styleUrl: './replay-subscriber.scss',
})
export class ReplaySubscriber {
  private readonly bus = inject(HERMES_BUS) as HermesBus<AppTopics>;
  private readonly scope = createAngularScope();

  index = 0;
  messages: string[] = [];

  constructor() {
    this.index = Date.now();

    this.bus.subscribe(
      'replay',
      (payload) => {
        this.messages = [payload.text, ...this.messages];
      },
      { scope: this.scope },
    );
  }
}
