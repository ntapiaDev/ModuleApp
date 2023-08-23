import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { List } from '../../models/list.model';
import { ListService } from '../../services/list.service';
import { Todo } from '../../models/todo.model';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  lists$: Observable<List[]>;
  todos$: Observable<Todo[]> = this.store.select('todos');

  constructor(private store: Store<{ todos: Todo[] }>, private listService: ListService) {
    this.lists$ = listService.getAll();
  }

  ngOnInit() {
    this.todos$.subscribe((todos) =>
      todos.length === 0 ? this.store.dispatch({ type: '[Todo] Load Todos' }) : null
    );
  }
}
