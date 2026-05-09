import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DemoLayout } from './layout/demo-layout/demo-layout';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DemoLayout],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
