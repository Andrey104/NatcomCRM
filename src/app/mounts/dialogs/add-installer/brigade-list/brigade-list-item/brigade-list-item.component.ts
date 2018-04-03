import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Brigade} from '../../../../../models/brigades/brigade';

@Component({
  selector: 'app-brigade-list-item',
  templateUrl: './brigade-list-item.component.html',
  styleUrls: ['./brigade-list-item.component.css']
})
export class BrigadeListItemComponent implements OnInit {

  constructor() { }
  @Input() brigade;
  @Output() onSelect = new EventEmitter<Brigade>();

  ngOnInit() {
  }
  select() {
    this.onSelect.emit(this.brigade);
  }

}
