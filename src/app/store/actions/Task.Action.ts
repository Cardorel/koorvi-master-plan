import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {Task} from "../../interfaces/Task";
import {User} from "../../interfaces/User";


export const TaskActionGroup = createActionGroup({
  source: 'task',
  events: {
    'add new task': props<{task: Task}>(),
    'dispatch new task': props<{task: Task}>(),
    'feedback message': props<{message: string}>(),
    'error message': props<{error: string}>(),
    'get task by id': props<{task: Task}>(),
    'load all tasks': emptyProps(),
    'get all tasks': props<{tasks: Task[]}>(),
    'update task': props<{task: Task}>(),
    'get loading tasks': props<{isLoading: boolean}>(),
    'get users': props<{users: User[]}>(),
    'load users': emptyProps(),
    'update tasks': props<{task: Task}>(),
    'dispatch updated task': props<{task: Task}>(),
    'delete task': props<{task: Task}>(),
    'dispatch deleted task': props<{task: Task}>()
  },
})
