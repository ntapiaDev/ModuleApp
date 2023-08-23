import { createReducer, on } from '@ngrx/store';
import { addList, deleteList, getAll } from './lists.actions';
import { List } from '../../models/list.model';

export const initialState: List[] = [];

export const listReducer = createReducer(
  initialState,
  on(addList, (state, { list }) => [...state, list]),
  on(deleteList, (state, { id }) => state.filter((list) => list._id !== id)),
  on(getAll, (state, { lists }) => lists)
);
