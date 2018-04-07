import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user';
import {BaseApi} from '../core/base-api';


@Injectable()
export class AuthenticationService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  getUser(): Observable<User> {
    return this.get(`user_info/`);
  }

  checkUser() {
    this.getUser().subscribe(user => {
      localStorage.setItem('user_name', user.username);
      localStorage.setItem('user_type', user.type.toString());
    }, error => {
      console.log(error);
    });
  }

  login(user: User): Observable<User> {
    return this.loginRequest('login/', user);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('type');
  }
}
