import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { TodoService } from '../../services/todo.service';
import { getAll } from '../../store/todos/todos.actions';

@Injectable()
export class TodoEffects {
  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Todo] Load Todos'),
      exhaustMap(() =>
        this.todoService.getAll().pipe(
          map((todos) => getAll({ todos })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(private actions$: Actions, private todoService: TodoService) {}
}
