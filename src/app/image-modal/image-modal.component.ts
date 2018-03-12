import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Picture} from '../models/picture';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.css']
})
export class ImageModalComponent implements OnInit {
  @Input() picture: Picture;
  @Output() close = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    console.log(this.picture);
  }

  onClose() {
    this.close.emit();
  }

}
