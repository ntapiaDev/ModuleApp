import { createAction, props } from '@ngrx/store';
import { List } from '../../models/list.model';

export const addList = createAction('[List] Add A List', props<{ list: List }>());
export const deleteList = createAction('[List] Delete A List', props<{ id: string }>());
export const getAll = createAction('[List] Get All Lists', props<{ lists: List[] }>());
