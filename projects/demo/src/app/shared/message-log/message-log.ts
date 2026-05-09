import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message-log',
  imports: [],
  templateUrl: './message-log.html',
  styleUrl: './message-log.scss',
})
export class MessageLog {
  @Input() title = 'Messages';
  @Input() messages: string[] = [];
}
