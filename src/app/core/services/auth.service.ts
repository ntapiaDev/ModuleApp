import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  uri: string = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {}

  signUp(user: User) {
    let api = `${this.uri}/register-user`;
    return this.http.post(api, user);
  }

  signIn(user: User) {
    return this.http
      .post<any>(`${this.uri}/signin`, user)
      .subscribe((res: any) => {
        this.cookieService.set('access_token', res.token);

        this.getUserProfile(res._id).subscribe((res) => {
          this.router.navigate(['user-profile/' + res.data._id]);
        });
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

  get isLoggedIn(): boolean {
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
      this.router.navigate(['log-in']);
    }
  }

  getUserProfile(id: string): Observable<any> {
    let api = `${this.uri}/user-profile/${id}`;
    return this.http.get(api, { headers: this.headers });
  }
}
