import {Component, Input, OnInit} from '@angular/core';
import {UtilsService} from '../services/utils.service';
import {Client} from '../models/client';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  @Input() client;
  constructor() { }

  ngOnInit() {
  }
  nameFormat(name: String) {
    if (name === null) {
      name = 'Нет имени';
    }
    if (name === '') {
      name = 'Нет имени';
    }
    return name;
  }



}
