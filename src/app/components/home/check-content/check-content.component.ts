import {Component, inject, input, Signal} from '@angular/core';
import {TaskActionGroup} from "../../../store/actions/Task.Action";
import {AuthService} from "../../../services/auth.service";
import {Task} from "../../../interfaces/Task";
import {selectCurrentTask} from "../../../store/reducers/Task.Reducer";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-check-content',
  standalone: true,
  imports: [],
  templateUrl: './check-content.component.html',
  styleUrl: './check-content.component.css'
})
export class CheckContentComponent{
  title = input.required<string>();
  completed = input.required<boolean>();
  store: Store = inject(Store);
  authService = inject(AuthService);
  currentTask: Signal<Task | null> = this.store.selectSignal(selectCurrentTask);


  onCheckToggle() {
    if (this.currentTask()?.userId === this.authService.userId()){
      const task: Task = {...this.currentTask()!, completed:!this.completed()};
      this.store.dispatch(TaskActionGroup.dispatchUpdatedTask({task}));
    }
  }
}
