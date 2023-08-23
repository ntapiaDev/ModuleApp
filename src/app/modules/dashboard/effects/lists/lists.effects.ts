import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { ListService } from '../../services/list.service';
import { getAll } from '../../store/lists/lists.actions';

@Injectable()
export class ListEffects {
  loadList$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[List] Load Lists'),
      exhaustMap(() =>
        this.listService.getAll().pipe(
          map((lists) => getAll({ lists })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(private actions$: Actions, private listService: ListService) {}
}
