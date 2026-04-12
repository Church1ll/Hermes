import { Component } from '@angular/core';
import { ChildII } from "../child-ii/child-ii";

@Component({
  selector: 'app-parent-iii',
  imports: [ChildII],
  templateUrl: './parent-iii.html',
  styleUrl: './parent-iii.scss',
})
export class ParentIII {}
