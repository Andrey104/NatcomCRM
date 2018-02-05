import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {User} from '../models/user';
import {MessageService} from '../services/message.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  username;
  password;
  loading = false;
  returnUrl: string;

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.loading = true;
    this.http
      .post('http://188.225.46.31/api/login/', { 'username': this.username, 'password': this.password })
      .subscribe(
        data => {
          localStorage.setItem('token', data['token']);
          localStorage.setItem('user_type', data['type']);
          localStorage.setItem('first_name', data['first_name']);
          localStorage.setItem('last_name', data['last_name']);
          this.router.navigate([this.returnUrl]);
        },
        err => {
          console.log('Error:' + err.error);
          this.loading = false;
        }
      );
  }

  logout() {
    localStorage.removeItem('token');
  }

  private token() {
    return localStorage.getItem('token');
  }

}


