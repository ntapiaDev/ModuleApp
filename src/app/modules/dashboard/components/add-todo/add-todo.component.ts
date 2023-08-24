import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent {
  @Input() id!: string;
  showForm: boolean = false;

  constructor(private store: Store<{ todos: Todo[] }>, private authService: AuthService, private todoService: TodoService) {}

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required])
  });

  toggleForm() {
    this.form.patchValue({
      name: '',
      content: ''
    });
    this.showForm = !this.showForm;
  }

  addTodo() {
    if (!this.form.valid) {
      return;
    }

    const todo: Todo = {
      _id: '',
      name: this.form.value.name!,
      content: this.form.value.content!,
      list: this.id,
      user: this.authService.getUsername(),
      done: false
    };

    this.todoService.add(todo).subscribe(
      (result: any) => {
        todo._id = result.result._id;
        this.store.dispatch({ type: '[Todo] Add A Todo', todo });
        this.form.patchValue({
          name: '',
          content: ''
        });
        this.showForm = false;
      },
      (error) => {
        console.error('Erreur lors de la création de la todo :', error);
      }
    );
  }
}
