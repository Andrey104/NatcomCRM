import {Component, OnInit, Input} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user';
import {Observable} from 'rxjs/Observable';
import {AuthenticationService} from '../services/auntification.service';
import {applyRedirects} from '@angular/router/src/apply_redirects';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService) {
  }

  user: User;

  ngOnInit() {
    this.authenticationService.getUser()
      .subscribe((user: User) => {
        this.user = user;
      });
  }

  logOut(): void {
    this.authenticationService.logout();
  }
}
