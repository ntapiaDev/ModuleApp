import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListComponent } from './components/list/list.component';
import { TodoComponent } from './components/todo/todo.component';
import { ListEffects } from './effects/lists/lists.effects';
import { TodoEffects } from './effects/todos/todos.effects';
import { TodoService } from './services/todo.service';
import { listReducer } from './store/lists/lists.reducer';
import { todoReducer } from './store/todos/todos.reducer';

@NgModule({
  declarations: [
    DashboardComponent,
    ListComponent,
    TodoComponent,
    AddTodoComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([ListEffects]),
    EffectsModule.forFeature([TodoEffects]),
    StoreModule.forFeature('lists', listReducer),
    StoreModule.forFeature('todos', todoReducer)
  ],
  providers: [
    TodoService
  ]
})
export class DashboardModule { }
