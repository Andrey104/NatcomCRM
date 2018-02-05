import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  name = localStorage.getItem('first_name');
  lastName = localStorage.getItem('last_name');
  type = localStorage.getItem('user_type');
  constructor() { }

  ngOnInit() {
  }

}
