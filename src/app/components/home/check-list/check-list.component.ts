import {Component, EventEmitter, inject, Output} from '@angular/core';
import {CheckItemComponent} from "../check-item/check-item.component";
import {Store} from "@ngrx/store";
import {selectTasks} from "../../../store/reducers/Task.Reducer";

@Component({
  selector: 'app-check-list',
  standalone: true,
  imports: [
    CheckItemComponent
  ],
  templateUrl: './check-list.component.html',
  styleUrl: './check-list.component.css'
})
export class CheckListComponent{
  @Output() openEditModalEmitter = new EventEmitter();
  store = inject(Store);
  tasks = this.store.selectSignal(selectTasks);

  openEditModal() {
    this.openEditModalEmitter.emit();
  }
}
