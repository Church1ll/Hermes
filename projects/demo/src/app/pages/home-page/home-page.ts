import { Component } from '@angular/core';
import { FeatureCard } from '../../shared/feature-card/feature-card';

@Component({
  selector: 'app-home-page',
  imports: [FeatureCard],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {}
