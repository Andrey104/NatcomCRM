import {Component, Input, OnInit} from '@angular/core';
import {UtilsService} from '../services/utils.service';
import {Client} from '../models/clients/client';

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
}
