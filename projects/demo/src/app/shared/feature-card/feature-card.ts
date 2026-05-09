import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-feature-card',
  imports: [RouterLink],
  templateUrl: './feature-card.html',
  styleUrl: './feature-card.scss',
})
export class FeatureCard {
  @Input() icon = '⚡';
  @Input() title = '';
  @Input() description = '';
  @Input() link = '/';
}
