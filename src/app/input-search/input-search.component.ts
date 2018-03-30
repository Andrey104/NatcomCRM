import {Component, ElementRef, EventEmitter, Input, OnChanges, Output, ViewChild} from '@angular/core';


@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.css']
})
export class InputSearchComponent implements OnChanges {
  @Input() statusName;
  @Output() out = new EventEmitter<string>();
  @ViewChild('input') input: ElementRef;

  constructor() {
  }

  ngOnChanges(): void {
    if (this.input.nativeElement.value !== '') {
      this.input.nativeElement.value = '';
    }
  }

  textOut(text: string) {
    this.out.emit(text);
  }

}
