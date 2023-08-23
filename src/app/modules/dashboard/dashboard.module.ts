import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AddListComponent } from './components/add-list/add-list.component';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListComponent } from './components/list/list.component';
import { TodoComponent } from './components/todo/todo.component';
import { TodoEffects } from './effects/todos/todos.effects';
import { TodoService } from './services/todo.service';
import { todoReducer } from './store/todos/todos.reducer';

@NgModule({
  declarations: [
    DashboardComponent,
    ListComponent,
    AddListComponent,
    TodoComponent,
    AddTodoComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([TodoEffects]),
    StoreModule.forFeature('todos', todoReducer)
  ],
  providers: [
    TodoService
  ]
})
export class DashboardModule { }
