import { Component, Input } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
  @Input() todo!: Todo;

  constructor(private store: Store<{ cats: Todo[] }>, private todoService: TodoService) {}

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
