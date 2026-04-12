import { Component } from '@angular/core';

@Component({
  selector: 'app-child-i',
  imports: [],
  templateUrl: './child-i.html',
  styleUrl: './child-i.scss',
})
export class ChildI {
  counter: number = 0;

  increment() {
    this.counter++;
  }

  decrement() {
    this.counter--;
  }
}
