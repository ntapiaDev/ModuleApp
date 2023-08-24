import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { List } from '../../models/list.model';
import { ListService } from '../../services/list.service';
import { Todo } from '../../models/todo.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  lists$: Observable<List[]> = this.listStore.select('lists');
  todos$: Observable<Todo[]> = this.todoStore.select('todos');

  name: string = '';
  modaleOpened: boolean = false;

  isLoggedIn: boolean = false;
  private subscription: Subscription;

  constructor(private listStore: Store<{ lists: List[] }>, private todoStore: Store<{ todos: Todo[] }>, private authService: AuthService, private listService: ListService) {
    this.subscription = this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  ngOnInit() {
    this.lists$.subscribe(() => this.listStore.dispatch({ type: '[List] Load Lists' }))
    this.todos$.subscribe(() => this.todoStore.dispatch({ type: '[Todo] Load Todos' }))
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  toggleModale() {
    this.name = '';
    this.modaleOpened = !this.modaleOpened;
  }

  addList() {
    if (!this.name) {
      return;
    }

    const list: List = {
      _id: '',
      name: this.name
    };

    this.listService.add(list).subscribe(
      (result: any) => {
        list._id = result.result._id;
        this.listStore.dispatch({ type: '[List] Add A List', list });
        this.name = '';
        this.modaleOpened = false;
      },
      (error) => {
        console.error('Erreur lors de la création de la liste :', error);
      }
    );
  }
}
