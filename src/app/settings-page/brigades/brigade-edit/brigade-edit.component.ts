import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import {Brigade} from '../../../models/brigades/brigade';
import {InstallerPosition} from '../../../models/installers/installer_position';
import {Installer} from '../../../models/installers/installer';
import {BrigadesService} from '../../../services/brigades.service';

@Component({
  selector: 'app-brigade-edit',
  templateUrl: './brigade-edit.component.html',
  styleUrls: ['./brigade-edit.component.css'],
  providers: [Modal]
})
export class BrigadeEditComponent implements OnInit, OnChanges {
  brigade = new Brigade();
  header = 'Добавить монтажника';
  edit = false;
  nameInputActive = false;
  installerListIsOpen = false;
  @Input() modalState;
  @Output() onClose = new EventEmitter<Boolean>(); // false - отмена, true - успешное выполнение


  constructor(private brigadesService: BrigadesService) {
  }
  brigadeForm: FormGroup = new FormGroup({
     name: new FormControl('', Validators.required),
  });
  formInputSetActive() {
    this.nameInputActive = true;
  }
  formInputReset() {
    this.nameInputActive = false;
  }
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
      this.brigadeForm.setValue({name: this.modalState.brigade.name});
      this.formInputSetActive();
    } else {
      this.brigade = new Brigade();
      this.header = 'Создать бригаду';
      this.edit = false;
      this.brigadeForm.reset();
      this.formInputReset();
    }
  }
  deleteInstaller(installerPosition?: InstallerPosition) {
    this.brigade.installers = this.brigade.installers.filter(installer => installer.installer.id !== installerPosition.installer.id);
  }
  deleteBrigade() {
    if (confirm('Удалить бригаду?')) {
      this.brigadesService.deleteBrigade(this.brigade).subscribe(data => {
          alert('Бригада удалена!');
          this.close(true);
      });
    }
  }
  close(successfully: Boolean) {
    this.onClose.emit(successfully);
  }
  checkInstallerId(id: number, brigade: Brigade) {
    for (const position of brigade.installers) {
      if (position.installer.id === id) {
        return true;
      }
    }
    return false;
  }
  addInstaller(installer) {
    let installerPosition;
    installerPosition = new InstallerPosition();
    installerPosition.installer = this.cloneObject(installer);
    this.brigade.installers = this.brigade.installers.concat(installerPosition);
    this.installerListIsOpen = false;
  }
  closeInstallerList(installer: Installer) {
    if (installer != null) {
      if (this.brigade.installers !== undefined) {
        if (this.checkInstallerId(installer.id, this.brigade)) {
          alert('Такой монтажник уже есть!');
        } else {
          this.addInstaller(installer);
        }
      } else {
        this.brigade.installers = [];
        this.addInstaller(installer);
      }
    } else {
      this.installerListIsOpen = false;
    }
  }
  brigadeMinMap(position: InstallerPosition) {
    position.installer = position.installer.id;
    return position;
  }
  openInstallerList() {
    this.installerListIsOpen = true;
  }
  ok() {
    const name = this.brigadeForm.value.name;
    let brigadeMin;
    brigadeMin = this.cloneObject(this.brigade);
    brigadeMin.installers = brigadeMin.installers.map(this.brigadeMinMap);
    brigadeMin.name = name;
    if (this.edit) {
      this.brigadesService.editBrigade(brigadeMin).subscribe(data => {
        if (data) {
          // alert('Бригада изменена успешно!');
          this.close(true);
        } else {
          alert('Ошибка при изменении бригады! Попробуйте снова!');
        }
      });
    } else {
        this.brigadesService.addBrigade(brigadeMin).subscribe(data => {
          if (data) {
            // alert('Бригада добавлена успешно!');
            this.close(true);
          } else {
            alert('Ошибка при добавлении бригады! Попробуйте снова!');
          }
        });
    }
  }
}
