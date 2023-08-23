import { createReducer, on } from '@ngrx/store';
import { addTodo, deleteTodo, getAll } from './todos.actions';
import { Todo } from '../../models/todo.model';

export const initialState: Todo[] = [];

export const todoReducer = createReducer(
  initialState,
  on(addTodo, (state, { todo }) => [...state, todo]),
  on(deleteTodo, (state, { id }) => state.filter((cat) => cat._id !== id)),
  on(getAll, (state, { todos }) => todos)
);
