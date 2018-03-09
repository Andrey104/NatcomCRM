import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-deal-client-info',
  templateUrl: './deal-client-info.component.html',
  styleUrls: ['./deal-client-info.component.css']
})
export class DealClientInfoComponent implements OnInit {
  @Input() openClientInfo;
  @Input() client;
  @Output() close = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  onClose() {
    this.close.emit();
  }
}
