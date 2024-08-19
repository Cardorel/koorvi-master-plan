import {Component, EventEmitter, inject, input, OnInit, Output, Signal} from '@angular/core';
import {ModalText} from "../../../interfaces/ModalText";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NgClass} from "@angular/common";
import {Task} from "../../../interfaces/Task";
import {TaskActionGroup} from "../../../store/actions/Task.Action";
import {Store} from "@ngrx/store";
import {AuthService} from "../../../services/auth.service";
import {selectCurrentTask} from "../../../store/reducers/Task.Reducer";

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass
  ],
  providers: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit {
  @Output() closeModalEmitter = new EventEmitter();
  store: Store = inject(Store);
  authService = inject(AuthService);
  modalText = input.required<ModalText>();
  addForm = input.required<FormGroup>();
  currentTask: Signal<Task | null> = this.store.selectSignal(selectCurrentTask);

  ngOnInit() {
     this.addForm().patchValue({
      title: this.isEditModal() ? this.currentTask()?.title : '',
    })
  }

  isEditModal(){
    return this.modalText().title.toLowerCase() === 'edit'
  }

  closeModal() {
    this.closeModalEmitter.emit();
  }

  submitTask() {
    const userId = this.authService.userId() as string;
    const task: Task = {
      completed: this.isEditModal() ? this.currentTask()!.completed : false,
      title: this.addForm().value.title as string,
      userId,
      id: this.isEditModal() ? this.currentTask()!.id : undefined,
    }
    try {
      if (this.isEditModal()){
        this.currentTask()?.userId === userId &&
        this.store.dispatch(TaskActionGroup.dispatchUpdatedTask({task}))

        this.currentTask()?.userId !== userId &&
        this.store.dispatch(TaskActionGroup.feedbackMessage({message: 'You can not update this task!'}))
      }else{
        this.store.dispatch(TaskActionGroup.dispatchNewTask({task}))
      }

      this.closeModal();
      this.addForm().reset();
    } catch (e) {
      console.log(e)
    }
  }
}
