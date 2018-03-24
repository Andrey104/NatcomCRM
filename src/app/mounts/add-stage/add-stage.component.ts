import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {InstallerPosition} from '../../models/installers/installer_position';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Installer} from '../../models/installers/installer';
import {BrigadesService} from '../../services/brigades.service';
import {Brigade} from '../../models/brigades/brigade';

@Component({
  selector: 'app-add-stage',
  templateUrl: './add-stage.component.html',
  styleUrls: ['./add-stage.component.css']
})
export class AddStageComponent implements OnInit, OnChanges {
  // brigade = new Brigade();
  // header = 'Добавить стадию';
  // edit = false;
  // nameInputActive = false;
  // installerListIsOpen = false;
  // @Input() modalState;
  // @Output() onClose = new EventEmitter<Boolean>(); // false - отмена, true - успешное выполнение
  //
  //
   constructor(private brigadesService: BrigadesService) {
  }
  // stageForm: FormGroup = new FormGroup({
  //   date: new FormControl('', Validators.required),
  // });
  // formInputSetActive() {
  //   this.nameInputActive = true;
  // }
  // formInputReset() {
  //   this.nameInputActive = false;
  // }
  ngOnInit() {
  }
  // cloneObject(object: Object): any {
  //   let newObject = {};
  //   newObject = JSON.parse(JSON.stringify(object));
  //   return newObject;
  // }
  ngOnChanges() {
  //   if (this.modalState.brigade != null) {
  //     this.brigade = this.cloneObject(this.modalState.brigade);
  //     this.header = 'Редактировать стадию';
  //     this.edit = true;
  //     this.brigadeForm.setValue({name: this.modalState.brigade.name});
  //     this.formInputSetActive();} else {
  //     this.brigade = new Brigade();
  //     this.header = 'Создать стадию';
  //     this.edit = false;
  //     this.brigadeForm.reset();
  //     this.formInputReset();
  //   }
  }
  // deleteInstaller(installerPosition?: InstallerPosition) {
  //   this.brigade.installers = this.brigade.installers.filter(installer => installer.installer.id !== installerPosition.installer.id);
  // }
  // close(successfully: Boolean) {
  //   this.onClose.emit(successfully);
  // }
  // checkInstallerId(id: number, brigade: Brigade) {
  //   for (const position of brigade.installers) {
  //     if (position.installer.id === id) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }
  // addInstaller(installer) {
  //   let installerPosition;
  //   installerPosition = new InstallerPosition();
  //   installerPosition.installer = this.cloneObject(installer);
  //   this.brigade.installers = this.brigade.installers.concat(installerPosition);
  //   this.installerListIsOpen = false;
  // }
  // closeInstallerList(installer: Installer) {
  //   if (installer != null) {
  //     if (this.brigade.installers !== undefined) {
  //       if (this.checkInstallerId(installer.id, this.brigade)) {
  //         alert('Такой монтажник уже есть!');
  //       } else {
  //         this.addInstaller(installer);
  //       }
  //     } else {
  //       this.brigade.installers = [];
  //       this.addInstaller(installer);
  //     }
  //   } else {
  //     this.installerListIsOpen = false;
  //   }
  // }
  // brigadeMinMap(position: InstallerPosition) {
  //   position.installer = position.installer.id;
  //   return position;
  // }
  // openInstallerList() {
  //   this.installerListIsOpen = true;
  // }
  // ok() {
  //   const name = this.brigadeForm.value.name;
  //   let brigadeMin;
  //   brigadeMin = this.cloneObject(this.brigade);
  //   brigadeMin.installers = brigadeMin.installers.map(this.brigadeMinMap);
  //   brigadeMin.name = name;
  //   if (this.edit) {
  //     this.brigadesService.editBrigade(brigadeMin).subscribe(data => {
  //       if (data) {
  //         alert('Бригада изменена успешно!');
  //         this.close(true);
  //       } else {
  //         alert('Ошибка при изменении бригады! Попробуйте снова!');
  //       }
  //     });
  //   } else {
  //     this.brigadesService.addBrigade(brigadeMin).subscribe(data => {
  //       if (data) {
  //         alert('Бригада добавлена успешно!');
  //         this.close(true);
  //       } else {
  //         alert('Ошибка при добавлении бригады! Попробуйте снова!');
  //       }
  //     });
  //   }
  // }
}
