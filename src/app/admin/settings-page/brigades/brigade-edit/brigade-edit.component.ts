import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Brigade} from '../../../../models/brigades/brigade';
import {BrigadesService} from '../../../../services/brigades.service';
import {Installer} from '../../../../models/installers/installer';
import {InstallerPosition} from '../../../../models/installers/installer_position';

@Component({
  selector: 'app-brigade-edit',
  templateUrl: './brigade-edit.component.html',
  styleUrls: ['./brigade-edit.component.css']
})
export class BrigadeEditComponent implements OnInit, OnChanges {
  brigade = new Brigade();
  header = 'Добавить монтажника';
  edit = false;
  // nameInputActive = false;
  // phoneInputActive = false;
  @Input() modalState;
  @Output() onClose = new EventEmitter<Boolean>(); // false - отмена, true - успешное выполнение


  constructor(private brigadesService: BrigadesService) {
  }
  // installerForm: FormGroup = new FormGroup({
  //   name: new FormControl('', Validators.required),
  //   phone: new FormControl('', Validators.required),
  // });
  // formInputSetActive() {
  //   this.nameInputActive = true;
  //   this.phoneInputActive = true;
  // }
  // formInputReset() {
  //   this.nameInputActive = false;
  //   this.phoneInputActive = false;
  // }
  ngOnInit() {
  }
  cloneObject(object: Object): any {
    // Такой вот костыль для полного глубокого копирования объекта
    let newObject = {};
    newObject = JSON.parse(JSON.stringify(object));
    return newObject;
    // Попытка самому написать функцию глубокого копирования
    // for (const key in object) {
    //   if (object.hasOwnProperty(key)) {
    //     if (typeof object[key] === 'object') {
    //
    //
    //
    //       newObject[key] = this.cloneObject(object[key]); Эта конструкция не работает;
    //
    //
    //     } else {
    //       newObject[key] = object[key];
    //     }
    //     // newObject[key] = object[key];
    //   }
    // }
    // return newObject;
  }
  ngOnChanges() {
    if (this.modalState.brigade != null) {
      // Клонируем объект brigade
      this.brigade = this.cloneObject(this.modalState.brigade);
      // ------------------------
      this.header = 'Редактировать бригаду';
      this.edit = true;
    } else {
      this.header = 'Создать бригаду';
      this.edit = false;
    }
  }

  deleteInstaller(installerPosition?: InstallerPosition) {
    this.brigade.installers = this.brigade.installers.filter(installer => installer.installer.id !== installerPosition.installer.id);
  }

  close(successfully: Boolean) {
    this.onClose.emit(successfully);
  }

  // addInstaller(installerPosition: InstallerPosition) {
  //   this.brigade.installers.concat(installerPosition);
  // }
  brigadeMinMap(position: InstallerPosition) {
    position.installer = position.installer.id;
    return position;
  }
  ok() {
    // const name = this.installerForm.value.name;
    // const phone = this.installerForm.value.phone;
    // const installer = new Installer();
    // installer.fio = name;
    // installer.phone = phone;
    let brigadeMin;
    brigadeMin = this.cloneObject(this.brigade);
    // for (const key in this.brigade) {
    //   if (this.brigade.hasOwnProperty(key)) {
    //     brigadeMin[key] = this.brigade[key];
    //   }
    // }
    brigadeMin.installers = brigadeMin.installers.map(this.brigadeMinMap);
    if (this.edit) {
      this.brigadesService.editBrigade(brigadeMin).subscribe(data => {
        if (data) {
          alert('Бригада изменена успешно!');
          this.close(true);
        } else {
          alert('Ошибка при изменении бригады! Попробуйте снова!');
        }
      });
    } else {
        this.brigadesService.addBrigade(brigadeMin).subscribe(data => {
          if (data) {
            alert('Бригада добавлена успешно!');
            this.close(true);
          } else {
            alert('Ошибка при добавлении бригады! Попробуйте снова!');
          }
        });
    }
  }
}
