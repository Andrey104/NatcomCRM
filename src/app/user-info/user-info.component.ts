import {Component, OnInit, Input} from '@angular/core';
import {User} from '../models/user';
import {AuthenticationService} from '../services/auntification.service';

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
}
