import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Brigade} from '../../../../models/brigades/brigade';

@Component({
  selector: 'app-brigade',
  templateUrl: './brigade.component.html',
  styleUrls: ['./brigade.component.css']
})
export class BrigadeComponent implements OnInit {

  constructor() { }
  @Input() brigade;
  @Output() onEdit = new EventEmitter<Brigade>();

  ngOnInit() {
  }
  edit() {
    this.onEdit.emit(this.brigade);
  }

}
