import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { HERMES_BUS, HermesBus, createAngularScope } from 'hermes';
import { AppTopics } from '../../topics';

@Component({
  selector: 'app-page-iii',
  imports: [],
  templateUrl: './page-iii.html',
  styleUrl: './page-iii.scss',
})
export class PageIII {
  private readonly hermes = inject(HERMES_BUS) as HermesBus<AppTopics>;
  private readonly scope = createAngularScope();

  messages: { data: string }[] = [];

  constructor(private cdr: ChangeDetectorRef) {
    this.hermes.subscribe(
      'socket.orders',
      (payload) => {
        this.messages.push(payload);
        if (!(this.cdr as any).destroyed) {
          this.cdr.markForCheck();
        }
      },
      { scope: this.scope }
    );
  }
}
