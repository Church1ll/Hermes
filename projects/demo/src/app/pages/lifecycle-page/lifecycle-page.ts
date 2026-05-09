import { Component, inject } from '@angular/core';
import { HERMES_BUS, HermesBus } from 'hermes';
import { AppTopics } from '../../topics';
import { LifecycleChild } from './components/lifecycle-child/lifecycle-child';

@Component({
  selector: 'app-lifecycle-page',
  imports: [LifecycleChild],
  templateUrl: './lifecycle-page.html',
  styleUrl: './lifecycle-page.scss',
})
export class LifecyclePage {
  private readonly bus = inject(HERMES_BUS) as HermesBus<AppTopics>;

  visible = true;
  value = 0;

  toggleComponent(): void {
    this.visible = !this.visible;
  }

  publish(): void {
    this.value++;
    this.bus.publish('lifecycle', { value: this.value });
  }
}
