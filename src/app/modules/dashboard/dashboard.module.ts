import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListComponent } from './components/list/list.component';
import { TodoComponent } from './components/todo/todo.component';
import { TodoService } from './services/todo.service';

@NgModule({
  declarations: [
    DashboardComponent,
    ListComponent,
    TodoComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
  providers: [
    TodoService
  ]
})
export class DashboardModule { }
