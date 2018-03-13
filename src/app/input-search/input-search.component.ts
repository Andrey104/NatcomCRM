import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.css']
})
export class InputSearchComponent implements OnInit {
  @Input() statusName;
  @Output() out = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {
  }

  textOut(text: string) {
    this.out.emit(text);
  }
}
