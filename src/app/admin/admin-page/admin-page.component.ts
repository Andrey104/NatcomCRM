import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  name = localStorage.getItem('first_name');
  lastName = localStorage.getItem('last_name');
  type = localStorage.getItem('user_type');
  constructor() { }

  ngOnInit() {
  }

}
