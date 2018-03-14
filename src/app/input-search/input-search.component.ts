import {Component, ElementRef, EventEmitter, Input, OnChanges, Output, Renderer2, ViewChild} from '@angular/core';


@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.css']
})
export class InputSearchComponent implements OnChanges {
  @Input() statusName;
  @Output() out = new EventEmitter<string>();
  @ViewChild('input') input: ElementRef;

  constructor(private renderer: Renderer2) {
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
