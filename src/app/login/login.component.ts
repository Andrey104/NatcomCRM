import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {User} from '../models/user';
import {MessageService} from '../services/message.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';


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
  fail: boolean;

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router,
              private messageService: MessageService) {
  }
  myForm: FormGroup = new FormGroup({
    'userName': new FormControl('', Validators.required),
    'userPassword': new FormControl('', Validators.required),
  });
  ngOnInit() {
    this.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/orders';
  }
  login() {
    this.loading = true;
    this.http
      .post('http://188.225.46.31/api/login/', { 'username': this.username, 'password': this.password })
      .subscribe(
        data => {
          localStorage.setItem('token', data['token']);
          localStorage.setItem('user_type', data['type']);
          this.router.navigate([this.returnUrl]);
        },
        err => {
          console.log('Error:' + err.error);
          this.loading = false;
          if (err.status === 400) {
            this.fail = true;
          }
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


