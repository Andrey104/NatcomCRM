import { Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';


@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.css']
})
export class InputSearchComponent implements OnChanges {
  @Input() statusName;
  @Output() out = new EventEmitter<string>();

  constructor() {
  }

  ngOnChanges(): void {
    console.log('ngOnChanges');
  }

  textOut(text: string) {
    this.out.emit(text);
  }
}
