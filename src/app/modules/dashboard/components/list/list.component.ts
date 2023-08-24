import { Component, Input, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { List } from '../../models/list.model';
import { Todo } from '../../models/todo.model';
import { ListService } from '../../services/list.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @Input() list!: List;
  todos$!: Observable<Todo[]>;

  isLoggedIn: boolean = false;
  private subscription: Subscription;

  constructor(private listStore: Store<{ lists: List[] }>, private todoStore: Store<{ todos: Todo[] }>, private authService: AuthService, private listService: ListService) {
    this.subscription = this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('list' in changes) {
      this.todos$ = this.todoStore.select('todos').pipe(
        map(todos => todos.filter(todo => todo.list === this.list._id))
      );
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
