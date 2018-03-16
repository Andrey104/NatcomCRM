import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Company} from '../../../../models/company';

@Component({
  selector: 'app-brigade',
  templateUrl: './brigade.component.html',
  styleUrls: ['./brigade.component.css']
})
export class BrigadeComponent implements OnInit {

  constructor() { }
  @Input() company;
  @Output() onEdit = new EventEmitter<Company>();

  ngOnInit() {
  }
  edit() {
    this.onEdit.emit(this.company);
  }

}
