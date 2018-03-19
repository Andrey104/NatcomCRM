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
  ngOnChanges() {
    if (this.modalState.brigade != null) {
      this.brigade = this.modalState.brigade;
      this.header = 'Редактировать бригаду';
      this.edit = true;
    } else {
      this.header = 'Создать бригаду';
      this.edit = false;
    }
  }

  deleteInstaller(installerPosition?: InstallerPosition) {
    alert(installerPosition.installer.fio);
  }
  close(successfully: Boolean) {
    this.onClose.emit(successfully);
  }
  // addInstaller(installerPosition: InstallerPosition) {
  //   this.brigade.installers.concat(installerPosition);
  // }
  // delInstaller(isntallerPosition: InstallerPosition) {
  // }

  ok() {
    // const name = this.installerForm.value.name;
    // const phone = this.installerForm.value.phone;
    // const installer = new Installer();
    // installer.fio = name;
    // installer.phone = phone;
    if (this.edit) {
    //   installer.id = this.modalState.installer.id;
    //   this.brigadesService.editInstaller(installer).subscribe(data => {
    //     if (data) {
    //       alert('Монтажник изменен успешно!');
    //       this.close(true);
    //     } else {
    //       alert('Ошибка при изменении монтажника! Попробуйте снова!');
    //     }
    //   });
    } else {
    //   this.brigadesService.addInstaller(installer).subscribe(data => {
    //     if (data) {
    //       alert('Монтажник добавлен успешно!');
    //       this.close(true);
    //     } else {
    //       alert('Ошибка при добавлении монтажника! Попробуйте снова!');
    //     }
    //   });
    }
  }
}
