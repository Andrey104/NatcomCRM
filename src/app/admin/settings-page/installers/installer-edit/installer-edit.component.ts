import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-installer-edit',
  templateUrl: './installer-edit.component.html',
  styleUrls: ['./installer-edit.component.css']
})
export class InstallerEditComponent implements OnInit {
  @Input() isOpen;
  @Output() onClose = new EventEmitter<boolean>(); // false - отмена, true - успешное выполнение


  constructor() { }

  ngOnInit() {
  }

  close() {
    this.onClose.emit(false);
  }
  ok() {
    alert('ok btn clicked');
  }

}
