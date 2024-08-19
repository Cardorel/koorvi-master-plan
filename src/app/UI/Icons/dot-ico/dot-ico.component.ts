import {Component, input} from '@angular/core';
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-dot-ico',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './dot-ico.component.html',
  styleUrl: './dot-ico.component.css'
})
export class DotIcoComponent {
dotCount = [1, 2, 3];
isOpen = input.required<boolean>();
}
