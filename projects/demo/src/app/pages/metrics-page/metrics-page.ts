import { Component, inject } from '@angular/core';
import { HERMES_BUS, HermesBus } from 'hermes';
import { AppTopics } from '../../topics';

@Component({
  selector: 'app-metrics-page',
  imports: [],
  templateUrl: './metrics-page.html',
  styleUrl: './metrics-page.scss',
})
export class MetricsPage {
  private readonly bus = inject(HERMES_BUS) as HermesBus<AppTopics>;

  metricItems = [
    { label: 'Published topics', value: 'N/A' },
    { label: 'Delivered messages', value: 'N/A' },
    { label: 'Active subscribers', value: 'N/A' },
  ];

  refresh(): void {
    const maybeMetrics = (this.bus as any).getMetrics?.();

    if (!maybeMetrics) {
      this.metricItems = [
        { label: 'Published topics', value: 'Not enabled' },
        { label: 'Delivered messages', value: 'Not enabled' },
        { label: 'Active subscribers', value: 'Not enabled' },
      ];
      return;
    }

    this.metricItems = [
      {
        label: 'Published topics',
        value: String(maybeMetrics.published?.size ?? 0),
      },
      {
        label: 'Delivered topics',
        value: String(maybeMetrics.delivered?.size ?? 0),
      },
      {
        label: 'Subscriber topics',
        value: String(maybeMetrics.subscribers?.size ?? 0),
      },
    ];
  }
}
