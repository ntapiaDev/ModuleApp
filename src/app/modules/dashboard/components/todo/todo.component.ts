import { Component, Input } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
  @Input() todo!: Todo;

  isLoggedIn: boolean = false;
  private subscription: Subscription;

  constructor(private store: Store<{ cats: Todo[] }>, private authService: AuthService, private todoService: TodoService) {
    this.subscription = this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  deleteTodo = async (id: string) => {
    this.todoService.delete(id).subscribe(
      (success) => {
        this.store.dispatch({ type: '[Todo] Delete A Todo', id });
      },
      (error) => {
        console.error('Erreur lors de la suppression de la todo :', error);
      }
    );
  };
}
