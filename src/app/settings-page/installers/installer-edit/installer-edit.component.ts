import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {InstallersService} from '../../../services/installers.service';
import {Installer} from '../../../models/installers/installer';
@Component({
  selector: 'app-installer-edit',
  templateUrl: './installer-edit.component.html',
  styleUrls: ['./installer-edit.component.css']
})
export class InstallerEditComponent implements OnInit, OnChanges {
  header = 'Добавить монтажника';
  edit = false;
  nameInputActive = false;
  phoneInputActive = false;
  @Input() modalState;
  @Output() onClose = new EventEmitter<Boolean>(); // false - отмена, true - успешное выполнение


  constructor(private installerService: InstallersService) {
  }

  installerForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
  });

  ngOnInit() {
  }
  ngOnChanges() {
    if (this.modalState.installer != null) {
      this.header = 'Редактировать монтажника';
      this.installerForm.setValue({name: this.modalState.installer.fio, phone: this.modalState.installer.phone});
      this.formInputSetActive();
      this.edit = true;
    } else {
      this.header = 'Добавить монтажника';
      this.installerForm.reset();
      this.formInputReset();
      this.edit = false;
    }
  }
  formInputSetActive() {
    this.nameInputActive = true;
    this.phoneInputActive = true;
  }
  formInputReset() {
    this.nameInputActive = false;
    this.phoneInputActive = false;
  }
  close(successfully: Boolean) {
    this.onClose.emit(successfully);
  }

  ok() {
    const name = this.installerForm.value.name;
    const phone = this.installerForm.value.phone;
    const installer = new Installer();
    installer.fio = name;
    installer.phone = phone;
    if (this.edit) {
      installer.id = this.modalState.installer.id;
      this.installerService.editInstaller(installer).subscribe(data => {
        if (data) {
          // alert('Монтажник изменен успешно!');
          this.close(true);
        } else {
          alert('Ошибка при изменении монтажника! Попробуйте снова!');
        }
      });
    } else {
      this.installerService.addInstaller(installer).subscribe(data => {
        if (data) {
          // alert('Монтажник добавлен успешно!');
          this.close(true);
        } else {
          alert('Ошибка при добавлении монтажника! Попробуйте снова!');
        }
      });
    }
  }

}
