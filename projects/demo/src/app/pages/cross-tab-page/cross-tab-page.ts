import { Component, inject } from '@angular/core';
import { HERMES_BUS, HermesBus, createAngularScope } from 'hermes';
import { AppTopics } from '../../topics';
import { MessageLog } from '../../shared/message-log/message-log';

@Component({
  selector: 'app-cross-tab-page',
  imports: [MessageLog],
  templateUrl: './cross-tab-page.html',
  styleUrl: './cross-tab-page.scss',
})
export class CrossTabPage {
  private readonly bus = inject(HERMES_BUS) as HermesBus<AppTopics>;
  private readonly scope = createAngularScope();

  messages: string[] = [];

  constructor() {
    this.bus.subscribe(
      'socket.orders',
      (payload) => {
        this.messages = [payload.data, ...this.messages].slice(0, 50);
      },
      { scope: this.scope },
    );
  }
}
