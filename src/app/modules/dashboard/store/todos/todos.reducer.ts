import { createReducer, on } from '@ngrx/store';
import { addTodo, getAll } from './todos.actions';
import { Todo } from '../../models/todo.model';

export const initialState: Todo[] = [];

export const todoReducer = createReducer(
  initialState,
  on(getAll, (state, { todos }) => todos),
  on(addTodo, (state, { todo }) => [...state, todo]),
);
