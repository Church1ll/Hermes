import { Component } from '@angular/core';
import { ParentI } from "./components/parent-i/parent-i";
import { ParentII } from "./components/parent-ii/parent-ii";

@Component({
  selector: 'app-page-ii',
  imports: [ParentI, ParentII],
  templateUrl: './page-ii.html',
  styleUrl: './page-ii.scss',
})
export class PageII {}
