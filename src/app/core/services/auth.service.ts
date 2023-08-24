import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  uri: string = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.checkLoggedIn());
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) {
    this.isLoggedInSubject.next(this.checkLoggedIn());
  }

  signUp(user: User) {
    let api = `${this.uri}/register-user`;
    return this.http.post(api, user);
  }

  signIn(user: User) {
    return this.http
      .post<any>(`${this.uri}/signin`, user)
      .subscribe((res: any) => {
        this.cookieService.set('access_token', res.token);
        this.isLoggedInSubject.next(true);
      });
  }

  getToken() {
    return this.cookieService.get('access_token');
  }

  getCurrentId() {
    let authToken = this.cookieService.get('access_token');
    if (authToken) {
      const decodedToken: any = jwtDecode(authToken);
      return decodedToken.userId;
    } else return null;
  }

  getUsername() {
    let authToken = this.cookieService.get('access_token');
    if (authToken) {
      const decodedToken: any = jwtDecode(authToken);
      return decodedToken.name;
    } else return null;
  }

  private checkLoggedIn(): boolean {
    let authToken = this.cookieService.get('access_token');
    if (authToken) {
      const decodedToken: any = jwtDecode(authToken);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp && decodedToken.exp > currentTime) {
        return true;
      }
    }
    return false;
  }

  doLogout() {
    let removeToken = this.cookieService.delete('access_token', '/');
    if (removeToken == null) {
      this.isLoggedInSubject.next(false);
    }
  }
}
