import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.css']
})
export class InputSearchComponent implements OnInit {
  @Output() searchField = new EventEmitter();
  searchStr;

  constructor() { }

  ngOnInit() {
  }
  search() {
    this.searchField.emit(this.searchStr);
  }

}
