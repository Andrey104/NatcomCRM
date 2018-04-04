import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {
  @Input() message;
  @Input() route;

  constructor() {
  }

  ngOnInit() {
  }

}
