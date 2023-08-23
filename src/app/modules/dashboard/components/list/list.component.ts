import { Component, Input, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { List } from '../../models/list.model';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @Input() list!: List;
  todos$!: Observable<Todo[]>;

  constructor(private todoService: TodoService) {
    // this.todos$ = todoService.getAll();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('list' in changes) {
      this.todos$ = this.todoService.getByListId(this.list._id);
    }
  }
}
