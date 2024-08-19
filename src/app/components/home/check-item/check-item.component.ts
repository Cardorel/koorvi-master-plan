import {Component, EventEmitter, inject, input, Output, Signal, signal} from '@angular/core';
import {DotIcoComponent} from "../../../UI/Icons/dot-ico/dot-ico.component";
import {CheckContentComponent} from "../check-content/check-content.component";
import {Store} from "@ngrx/store";
import {TaskActionGroup} from "../../../store/actions/Task.Action";
import {Task} from "../../../interfaces/Task";
import {NgOptimizedImage, NgStyle} from "@angular/common";
import {User} from "../../../interfaces/User";
import {selectUsers} from "../../../store/reducers/Task.Reducer";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-check-item',
  standalone: true,
  imports: [
    DotIcoComponent,
    CheckContentComponent,
    NgOptimizedImage,
    NgStyle,
  ],
  templateUrl: './check-item.component.html',
  styleUrl: './check-item.component.css',
  host: {
    '(mouseenter)': 'handleCurrentTask()',
    '(click)': 'handleCloseDropdown()'
  }
})
export class CheckItemComponent {
  isOpen = signal(false);
  @Output() openEditModalEmitter = new EventEmitter();
  store = inject(Store);
  users: Signal<User[]> = this.store.selectSignal(selectUsers)
  task = input.required<Task>();
  authService = inject(AuthService);

  currentUser(): User{
    return this.users().find(user => user.userId === this.task().userId)!;
  }

  openEditModal($event: MouseEvent) {
    $event.stopPropagation();
    const userId = this.authService.userId()!;
    if (this.task().userId === userId) {
      this.openEditModalEmitter.emit()
    } else{
      this.handleFeedbackMessage('edit');
    }
  }

  handleFeedbackMessage(type: string){
    this.store.dispatch(TaskActionGroup.feedbackMessage({message: `You are not allowed to ${type} this task!`}));
    this.handleCloseDropdown();
  }

  toggleOpen = (event: Event) => {
    event.stopPropagation();
    this.isOpen.update(t => !t)
  };


  deleteTask() {
    const userId = this.authService.userId()!;
    if (this.task().userId === userId) {
      this.store.dispatch(TaskActionGroup.dispatchDeletedTask({task: this.task()}))
    } else {
      this.handleFeedbackMessage('delete');
    }
  }

  handleCurrentTask() {
    this.store.dispatch(TaskActionGroup.getTaskById({task: this.task()}))
  }

  handleCloseDropdown() {
    this.isOpen.set(false)
  }
}
