import {Component, EventEmitter, Output} from '@angular/core';
import {CheckListComponent} from "../check-list/check-list.component";

@Component({
  selector: 'app-task-container',
  standalone: true,
  imports: [
    CheckListComponent
  ],
  templateUrl: './task-container.component.html',
  styleUrl: './task-container.component.css'
})
export class TaskContainerComponent {
  @Output() openModalEmitter = new EventEmitter();
  @Output() openEditModalEmitter = new EventEmitter();
  openModal() {
    this.openModalEmitter.emit();
  }
  openEditModal() {
    this.openEditModalEmitter.emit();
  }
}
