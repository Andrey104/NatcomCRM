import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-installer-edit',
  templateUrl: './installer-edit.component.html',
  styleUrls: ['./installer-edit.component.css']
})
export class InstallerEditComponent implements OnInit {
  edit = false;
  header = 'Добавить монтажника';
  @Input() isOpen;
  @Output() onClose = new EventEmitter<boolean>(); // false - отмена, true - успешное выполнение


  constructor() { }
  installerForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
  });

  ngOnInit() {
  }

  close() {
    this.onClose.emit(false);
  }
  ok() {
    const name = this.installerForm.value.name();
    const phone = this.installerForm.value.phone();
    alert('ok btn clicked' + name + phone);
  }

}
