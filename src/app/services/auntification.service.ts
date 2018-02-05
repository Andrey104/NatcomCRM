import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {catchError, tap} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user';
import {MessageService} from './message.service';
import { of } from 'rxjs/observable/of';



@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient, private messageService: MessageService) {
  }
  private userUrl = 'http://188.225.46.31//api/user_info';

  login(username: string, password: string) {
    const user = {username: username, password: password};


    this.http
      .post('/api/login', user)
      // See below - subscribe() is still necessary when using post().
      .subscribe(// Successful responses call the first callback.
        data => {
          localStorage.setItem('token', data['token']);
          this.checkUser();
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

  getUser(): Observable<User> {
    return this.http.get<User>(this.userUrl,
      {headers: new HttpHeaders().set('Authorization', 'token ' + this.token())});
  }

  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  private token() {
    return localStorage.getItem('token');
  }

  checkUser() {
    console.log('start');
    alert('start');
    this.getUser().subscribe(user => {
      localStorage.setItem('user_name', user.username);
      localStorage.setItem('user_type', user.type.toString());
      alert('Успех!');
    }, error => {console.log(error); });
  }


}
