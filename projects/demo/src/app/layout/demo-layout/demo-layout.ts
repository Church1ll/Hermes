import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-demo-layout',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './demo-layout.html',
  styleUrl: './demo-layout.scss',
})
export class DemoLayout {}
