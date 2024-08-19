import {Action, createFeature, createReducer, on} from "@ngrx/store";
import {TaskActionGroup} from "../actions/Task.Action";
import {Task} from "../../interfaces/Task";
import {User} from "../../interfaces/User";

export interface initialStateType {
  tasks: Task[],
  currentTask: Task | null ,
  feedbackMessage: string,
  errorMessage: string;
  isLoading: boolean;
  users: User[];
}

const initialState: initialStateType = {
  tasks: [],
  currentTask: null,
  feedbackMessage: "",
  errorMessage: "",
  isLoading: false,
  users: []
}

export const TaskReducer = createFeature({
  name: "task",
  reducer: createReducer(
    initialState,
    on(TaskActionGroup.addNewTask,  (state, action:  { task: Task; } & Action<'[task] add new task'>) => {
      return {
        ...state,
        tasks: [...state.tasks, action.task],
      };
    }),
    on(TaskActionGroup.feedbackMessage, (state, action: { message: string }) => {
      return {
       ...state,
        feedbackMessage: action.message,
      };
    }),
    on(TaskActionGroup.errorMessage, (state, action: { error: string }) => {
      return {
       ...state,
        errorMessage: action.error,
      };
    }),
    on(TaskActionGroup.getTaskById, (state, action: { task: Task }) => {
      return {
       ...state,
        currentTask: action.task,
      };
    }),
    on(TaskActionGroup.getAllTasks, (state, action: {tasks: Task[]}) => ({...state,
      tasks: action.tasks})),
    on(TaskActionGroup.updateTask, (state, action: { task: Task }) => {
      const updatedTasks = state.tasks.map(task => task.id === action.task.id? action.task : task);
      return {
       ...state,
        tasks: updatedTasks,
      };
    }),
    on(TaskActionGroup.deleteTask, (state, action: { task: Task }) => {
      const deletedTasks = state.tasks.filter(task => task.id!== action.task.id);
      return {
       ...state,
        tasks: deletedTasks,
      };
    }),
    on(TaskActionGroup.getLoadingTasks, (state, action: { isLoading: boolean }) => ({...state, isLoading: action.isLoading})),
    on(TaskActionGroup.getUsers, (state, action: { users: User[] }) =>{
      return {
       ...state,
        users: action.users
      };
    })
  )
})

export const {
  selectCurrentTask,
  selectFeedbackMessage,
  selectErrorMessage,
  selectIsLoading,
  selectTasks,
  selectUsers,
} = TaskReducer;
