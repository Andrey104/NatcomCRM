import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {User} from '../models/user';
import {MessageService} from '../services/message.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../services/auntification.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  username;
  password;
  loading = false;
  fail: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthenticationService) {
  }
  myForm: FormGroup = new FormGroup({
    'userName': new FormControl('', Validators.required),
    'userPassword': new FormControl('', Validators.required),
  });
  ngOnInit() {
    this.logout();
  }
  login() {
    this.loading = true;
    const user = new User();
    user.username = this.username;
    user.password = this.password;
    this.authService.login(user).subscribe(
      data => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user_type', data.type.toString());
        localStorage.setItem('id_manager', data.id.toString());
        this.router.navigate(['/user']);
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
    this.authService.logout();
  }
}


