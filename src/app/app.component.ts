import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TaskActionGroup} from "./store/actions/Task.Action";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  store: Store = inject(Store)

  ngOnInit(): void {
    this.store.dispatch(TaskActionGroup.loadAllTasks());
    this.store.dispatch(TaskActionGroup.loadUsers());
  }
}
