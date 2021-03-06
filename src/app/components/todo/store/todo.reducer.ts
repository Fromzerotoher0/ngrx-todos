import * as fromTodo from '../store/todo.actions';
import { Todo } from '../model/todo.model';

const todo1 = new Todo('learn ngrx');
const todo2 = new Todo('do exercise');
todo2.completed = true;

const initialState: Todo[] = [todo1, todo2];

export function todoReducer(
  state = initialState,
  action: fromTodo.actions
): Todo[] {
  switch (action.type) {
    case fromTodo.ADD_TODO:
      const todo = new Todo(action.text);
      return [...state, todo];

    case fromTodo.TOGGLE_TODO:
      return state.map((todoEdit) => {
        if (todoEdit.id === action.id) {
          return {
            ...todoEdit,
            completed: !todoEdit.completed,
          };
        } else {
          return todoEdit;
        }
      });
    case fromTodo.EDIT_TODO:
      return state.map((todoEdit) => {
        if (todoEdit.id === action.id) {
          return {
            ...todoEdit,
            text: action.text,
          };
        } else {
          return todoEdit;
        }
      });
    case fromTodo.DELETE_TODO:
      return state.filter((todos) => todos.id !== action.id);
    case fromTodo.TOGGLE_ALL_TODO:
      return state.map((todoEdit) => {
        return { ...todoEdit, completed: action.completed };
      });
    case fromTodo.DELETE_COMPLETED_TODO:
      return state.filter((todos) => !todos.completed);

    default:
      return state;
  }
}
