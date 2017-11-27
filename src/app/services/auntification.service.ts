import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    const user = {username: username, password : password};

    this.http
      .post('/api/login', user)
      // See below - subscribe() is still necessary when using post().
      .subscribe(// Successful responses call the first callback.
        data => {
          localStorage.setItem('token', data['token']);
          },
        // Errors will call this callback instead:
        err => {
          console.log('Error!');
        }
        );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
  }
}
