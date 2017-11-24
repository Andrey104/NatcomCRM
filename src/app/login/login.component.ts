import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";

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
              private router: Router) {
  }

  ngOnInit() {
    this.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.loading = true;

    this.http
      .post('http://188.225.46.31/api/login/',{ "username": this.username, "password": this.password })
      .subscribe(
        data => {
          localStorage.setItem('token', data['token']);
          this.router.navigate([this.returnUrl]);
        },
        err => {
          console.log('Error:'+ err.error);
          this.loading = false;
        }
      );
  }

  logout() {
    localStorage.removeItem('token');
  }

}
