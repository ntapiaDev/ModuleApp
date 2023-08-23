import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  uri: string = 'http://localhost:4000/todo';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    let api = `${this.uri}`;
    return this.http.get(api, { headers: this.headers });
  }

  getByListId(id: string): Observable<any> {
    let api = `${this.uri}/list/${id}`;
    return this.http.get(api, { headers: this.headers });
  }
}
