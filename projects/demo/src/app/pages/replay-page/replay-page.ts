import { Component, inject } from '@angular/core';
import { HERMES_BUS, HermesBus } from 'hermes';
import { AppTopics } from '../../topics';
import { MessageLog } from '../../shared/message-log/message-log';
import { ReplaySubscriber } from './components/replay-subscriber/replay-subscriber';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-replay-page',
  imports: [ReplaySubscriber, MessageLog, FormsModule],
  templateUrl: './replay-page.html',
  styleUrl: './replay-page.scss',
})
export class ReplayPage {
  private readonly bus = inject(HERMES_BUS) as HermesBus<AppTopics>;

  text = '';
  published: string[] = [];
  subscribers: number[] = [];

  publish(): void {
    const value = this.text.trim() || `Message ${this.published.length + 1}`;

    this.bus.publish('replay', {
      text: value,
      createdAt: Date.now(),
    });

    this.published = [value, ...this.published];
    this.text = '';
  }

  createSubscriber(): void {
    this.subscribers = [...this.subscribers, Date.now()];
  }
}
