import {inject, Injectable} from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {from, of, tap} from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import {TaskService} from "../../services/task/task.service";
import {TaskActionGroup} from "../actions/Task.Action";
import {Task} from "../../interfaces/Task";

@Injectable()
export class TaskEffects {
  actions$ = inject(Actions)
  taskService = inject(TaskService);
  store = inject(Store);


  getAllTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActionGroup.loadAllTasks),
      mergeMap((action) => {
        this.store.dispatch(TaskActionGroup.getLoadingTasks({ isLoading: true }));
        return this.taskService.loadAllTask().pipe(
          map((tasks) => {
            return TaskActionGroup.getAllTasks({ tasks });
          }),
          tap(()=> this.store.dispatch(TaskActionGroup.getLoadingTasks({ isLoading: false }))),
          catchError((error) => {
            this.store.dispatch(TaskActionGroup.getLoadingTasks({ isLoading: true }));
            return  of(TaskActionGroup.errorMessage({ error: error.message }))
          })
        )
      })
    )
  );

  loadAllUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActionGroup.loadUsers),
      mergeMap((action) => {
        return this.taskService.users().pipe(
          map((users) => {
            return TaskActionGroup.getUsers({ users });
          }),
          catchError((error) => {
            return  of(TaskActionGroup.errorMessage({ error: error.message }))
          })
        )
      })
    )
  );

  addNewTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActionGroup.dispatchNewTask),
      mergeMap((action) => this.taskService.addTask(action.task).pipe(
        map((task) => TaskActionGroup.addNewTask({ task:task! })),
        catchError((error) =>
          of(TaskActionGroup.errorMessage({ error: error.message }))
        )
      ))
    )
  );

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActionGroup.dispatchUpdatedTask),
      mergeMap((action) => this.taskService.updateTask(action.task).pipe(
        map((task) => TaskActionGroup.updateTask({ task })),
        catchError((error) =>
          of(TaskActionGroup.errorMessage({ error: error.message }))
        )
      ))
    )
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActionGroup.dispatchDeletedTask),
      mergeMap((action) => this.taskService.deleteTask(action.task).pipe(
        map((task) => TaskActionGroup.deleteTask({task})),
        catchError((error) =>
          of(TaskActionGroup.errorMessage({ error: error.message }))
        )
      ))
    )
  );
}
