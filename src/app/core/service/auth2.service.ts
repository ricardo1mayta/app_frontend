import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class Auth2Service {
  user: User[] = [];
  constructor(private http: HttpClient, private router: Router) {}

  login(_email: string, _password: string) {
    return this.http.post(`${environment.url_api2}/api/login`, {
      email: _email,
      password: _password,
    });
  }
  logout() {
    localStorage.removeItem('user');
    return true; // this.afAuth.signOut();
  }
  hasUSer() {
    this.http
      .get(`${environment.url_api2}/secureApi/check`)
      .subscribe((res) => {
        if (Object.values(res)[0] === 500) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          this.router.navigate(['auth']);
          console.log(Object.values(res)[0]);
        }
      });

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      return false;
    }
    return true;

    // this.afAuth.authState;
  }
  register(user: User) {
    return this.http.post(`${environment.url_api2}/api/register`, user);
  }
}
