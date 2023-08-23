import { createAction, props } from '@ngrx/store';
import { Todo } from '../../models/todo.model';

export const getAll = createAction('[Todo] Get All Todos', props<{ todos: Todo[] }>());
export const addTodo = createAction('[Todo] Add A Todo', props<{ todo: Todo }>());
