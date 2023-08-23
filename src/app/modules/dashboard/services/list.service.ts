import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { List } from '../models/list.model';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  uri: string = 'http://localhost:4000/list';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    let api = `${this.uri}`;
    return this.http.get(api, { headers: this.headers });
  }

  add(todo: List) {
    let api = `${this.uri}/add/`;
    return this.http.post(api, todo, { headers: this.headers });
  }

  delete(id: string) {
    let api = `${this.uri}/${id}`;
    return this.http.delete(api, { headers: this.headers });
  }
}
