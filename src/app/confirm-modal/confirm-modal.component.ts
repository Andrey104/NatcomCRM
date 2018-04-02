import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {
  @Input() confirmModal: {showConfirmDialog: boolean, confirmMessage: string};
  @Output() userAnswer = new EventEmitter<boolean>();
  closable = true;

  constructor() {
  }

  ngOnInit() {
  }

  onClose() {
    this.emitData(false);
  }

  success() {
    this.emitData(true);
  }

  emitData(answer: boolean) {
    this.confirmModal.showConfirmDialog = false;
    this.userAnswer.emit(answer);
  }

}
