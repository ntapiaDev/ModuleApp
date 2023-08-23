import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { List } from '../../models/list.model';
import { ListService } from '../../services/list.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  lists$: Observable<List[]>;

  constructor(private listService: ListService) {
    this.lists$ = listService.getAll();
  }
}
