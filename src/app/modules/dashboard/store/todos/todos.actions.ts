import { createAction, props } from '@ngrx/store';
import { Todo } from '../../models/todo.model';

export const addTodo = createAction('[Todo] Add A Todo', props<{ todo: Todo }>());
export const deleteTodo = createAction('[Todo] Delete A Todo', props<{ id: string }>());
export const getAll = createAction('[Todo] Get All Todos', props<{ todos: Todo[] }>());
