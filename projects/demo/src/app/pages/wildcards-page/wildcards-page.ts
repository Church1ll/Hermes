import { Component, inject } from '@angular/core';
import { HERMES_BUS, HermesBus, createAngularScope, BusMessage } from 'hermes';
import { AppTopics } from '../../topics';
import { MessageLog } from '../../shared/message-log/message-log';

@Component({
  selector: 'app-wildcards-page',
  imports: [MessageLog],
  templateUrl: './wildcards-page.html',
  styleUrl: './wildcards-page.scss',
})
export class WildcardsPage {
  private readonly bus = inject(HERMES_BUS) as HermesBus<AppTopics>;
  private readonly scope = createAngularScope();

  logs: string[] = [];

  constructor() {
    this.bus.subscribePattern(
      'chat.*',
      (message: BusMessage<any>) => {
        this.logs = [`${message.topic}: ${JSON.stringify(message.payload)}`, ...this.logs];
      },
      { scope: this.scope },
    );
  }

  publishCreated(): void {
    this.bus.publish('chat.created', {
      text: 'New chat message',
      createdAt: Date.now(),
    });
  }

  publishUpdated(): void {
    this.bus.publish('chat.updated', {
      text: 'Edited chat message',
      updatedAt: Date.now(),
    });
  }

  publishDeleted(): void {
    this.bus.publish('chat.deleted', {
      id: crypto.randomUUID(),
      deletedAt: Date.now(),
    });
  }
}
