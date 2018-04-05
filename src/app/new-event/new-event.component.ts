import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnChanges {
  @Input() closable = true;
  @Input() newEvent;
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  event: {message: string, route: ''};

  constructor() {
  }

  ngOnChanges() {
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

}
