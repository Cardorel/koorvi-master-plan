import {Component, inject, input, OnInit} from '@angular/core';
import {tap, timer} from "rxjs";
import {TaskActionGroup} from "../../../store/actions/Task.Action";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-feedback-message',
  standalone: true,
  imports: [],
  templateUrl: './feedback-message.component.html',
  styleUrl: './feedback-message.component.css'
})
export class FeedbackMessageComponent implements OnInit {
message = input.required<string>();
store = inject(Store);

  ngOnInit() {
    timer(3000).pipe(
      tap(() => this.store.dispatch(TaskActionGroup.feedbackMessage({ message: '' })))
    ).subscribe()
  }
}
