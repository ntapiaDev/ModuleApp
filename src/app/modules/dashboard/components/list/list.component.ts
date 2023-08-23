import { Component, Input, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { List } from '../../models/list.model';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @Input() list!: List;
  todos$!: Observable<Todo[]>;

  constructor(private store: Store<{ todos: Todo[] }>) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('list' in changes) {
      this.todos$ = this.store.select('todos').pipe(
        map(todos => todos.filter(todo => todo.list === this.list._id))
      );
    }
  }
}
