import {inject, Injectable} from '@angular/core';
import {map, Observable, of} from "rxjs";
import {User} from "../../interfaces/User";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Task} from "../../interfaces/Task";
import {Store} from "@ngrx/store";
import {TaskActionGroup} from "../../store/actions/Task.Action";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  firestore = inject(AngularFirestore);
  store = inject(Store)

  users(): Observable<User[]>{
   return this.firestore.collection<User>('users')
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => a.payload.doc.data())),
      );
  }

  addTask(task: Task){
    this.firestore.collection('tasks').add(task).then(_ => {
      this.store.dispatch(TaskActionGroup.feedbackMessage({message: 'Task added successfully'}))
    }).catch(e => {
      this.store.dispatch(TaskActionGroup.errorMessage({error: e.message || 'something went wrong.'}))
    });
    return of(task)
  }

   deleteTask(task: Task){
     this.firestore.collection('tasks').doc(task.id).delete().then(_ => {
       this.store.dispatch(TaskActionGroup.feedbackMessage({message: 'Task deleted successfully'}))
     }).catch(e => {
       this.store.dispatch(TaskActionGroup.errorMessage({error: e.message || 'something went wrong.'}))
     });
    return of(task);
  }

   updateTask(task: Task) {
     this.firestore.collection('tasks').doc(task.id).update(task).then(_ => {
       this.store.dispatch(TaskActionGroup.feedbackMessage({message: 'Task updated successfully'}))
     }).catch(e => {
       this.store.dispatch(TaskActionGroup.errorMessage({error: e.message || 'something went wrong.'}))
     });
     return of(task);
  }

  loadAllTask() {
    return this.firestore.collection('tasks').snapshotChanges()
      .pipe(
        map(actions => actions.map(a => ({
          ...(a.payload.doc.data() as Task),
          id: a.payload.doc.id,
        })))
      )
  }
}
