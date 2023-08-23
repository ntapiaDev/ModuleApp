import { Component, Input, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { List } from '../../models/list.model';
import { Todo } from '../../models/todo.model';
import { ListService } from '../../services/list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @Input() list!: List;
  todos$!: Observable<Todo[]>;

  constructor(private listStore: Store<{ lists: List[] }>, private todoStore: Store<{ todos: Todo[] }>, private listService: ListService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('list' in changes) {
      this.todos$ = this.todoStore.select('todos').pipe(
        map(todos => todos.filter(todo => todo.list === this.list._id))
      );
    }
  }

  deleteList = async (id: string) => {
    this.listService.delete(id).subscribe(
      (success) => {
        this.listStore.dispatch({ type: '[List] Delete A List', id });
      },
      (error) => {
        console.error('Erreur lors de la suppression de la liste :', error);
      }
    );
  };
}
