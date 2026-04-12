import { Component } from '@angular/core';
import { ChildI } from "../child-i/child-i";

@Component({
  selector: 'app-parent-i',
  imports: [ChildI],
  templateUrl: './parent-i.html',
  styleUrl: './parent-i.scss',
})
export class ParentI {}
