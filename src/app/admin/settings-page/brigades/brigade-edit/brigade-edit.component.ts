import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Brigade} from '../../../../models/brigades/brigade';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Installer} from '../../../../models/installers/installer';
import {InstallersService} from '../../../../services/installers.service';

@Component({
  selector: 'app-brigade-edit',
  templateUrl: './brigade-edit.component.html',
  styleUrls: ['./brigade-edit.component.css']
})
export class BrigadeEditComponent implements OnInit, OnChanges {
  brigade = new Brigade();
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
    if (this.modalState.brigade != null) {
      this.brigade = this.modalState.brigades;
      this.header = 'Редактировать бригаду';
      this.edit = true;
    } else {
      this.header = 'Создать бригаду';
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
          alert('Монтажник изменен успешно!');
          this.close(true);
        } else {
          alert('Ошибка при изменении монтажника! Попробуйте снова!');
        }
      });
    } else {
      this.installerService.addInstaller(installer).subscribe(data => {
        if (data) {
          alert('Монтажник добавлен успешно!');
          this.close(true);
        } else {
          alert('Ошибка при добавлении монтажника! Попробуйте снова!');
        }
      });
    }
  }
}
