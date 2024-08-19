import {Component, inject, Signal, signal} from '@angular/core';
import {HeaderComponent} from "./header/header.component";
import {TaskContainerComponent} from "./task-container/task-container.component";
import {ModalComponent} from "../Modal/modal/modal.component";
import {ModalText} from "../../interfaces/ModalText";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {selectFeedbackMessage, selectIsLoading} from "../../store/reducers/Task.Reducer";
import {SpinnerIcoComponent} from "../../UI/Icons/spinner-ico/spinner-ico.component";
import {FeedbackMessageComponent} from "./feedback-message/feedback-message.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    TaskContainerComponent,
    ModalComponent,
    SpinnerIcoComponent,
    FeedbackMessageComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isModalOpen = signal<boolean>(false);
  modalText = signal<ModalText>({
    btnText: 'Save',
    title: 'Add'
  });
  store = inject(Store);
  addForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(10)]),
  })
  isLoading = this.store.selectSignal(selectIsLoading);
  feedbackMessage: Signal<string> = this.store.selectSignal(selectFeedbackMessage);


  openEditModal(title: string) {
    this.modalText.update(t => ({
      ...t,
      title
    }));
    this.isModalOpen.set(true)
  }

  openModal() {
    this.modalText.set({
      btnText: 'Save',
      title: 'Add'
    })
    this.isModalOpen.set(true)
  }

  closeModal() {
    this.isModalOpen.set(false)
  }
}
