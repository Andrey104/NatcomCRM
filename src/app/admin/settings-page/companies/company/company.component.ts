import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Company} from '../../../../models/company';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  constructor() { }
  @Input() company;
  @Output() onEdit = new EventEmitter<Company>();

  ngOnInit() {
  }
  edit() {
    this.onEdit.emit(this.company);
  }

}
