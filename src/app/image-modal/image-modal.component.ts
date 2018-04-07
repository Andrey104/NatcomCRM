import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Picture} from '../models/picture';
import {Client} from '../models/clients/client';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.css']
})
export class ImageModalComponent implements OnInit {
  @Input() picture: Picture;
  @Input() visible: boolean;
  zoomIn = false;
  @Output() successClient = new EventEmitter<Client>();
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor() {
  }

  ngOnInit() {
  }

  onClose() {
    this.visibleChange.emit();
  }

  zoom() {
    this.zoomIn = !this.zoomIn;
  }
}
