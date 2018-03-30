import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {BrigadesService} from '../../../services/brigades.service';
import {Installer} from '../../../models/installers/installer';
import {InstallerPosition} from '../../../models/installers/installer_position';
import {Brigade} from '../../../models/brigades/brigade';
import {StageMountService} from '../../../services/stage-mount.service';

@Component({
  selector: 'app-add-installer',
  templateUrl: './add-installer.component.html',
  styleUrls: ['./add-installer.component.css']
})
export class AddInstallerComponent implements OnInit, OnChanges {
  installers: InstallerPosition[];
  stageId: string;
  installerListIsOpen = false;
  open = false;
  @Input() modalState;
  @Output() onClose = new EventEmitter<Boolean>(); // false - отмена, true - успешное выполнение


  constructor(private stageService: StageMountService) {
  }

  ngOnInit() {
  }

  cloneObject(object: Object): any {
    // Такой вот костыль для полного глубокого копирования объекта
    let newObject = {};
    newObject = JSON.parse(JSON.stringify(object));
    return newObject;
  }

  ngOnChanges() {
    this.open = this.modalState.open;
    if (this.modalState.installers != null) {
      this.installers = this.cloneObject(this.modalState.installers);
    } else {
      this.installers = [];
    }
    if (this.modalState.stageId) {
      this.stageId = this.modalState.stageId;
    }
  }

  deleteInstaller(installerPosition?: InstallerPosition) {
    this.installers = this.installers.filter(installer => installer.installer.id !== installerPosition.installer.id);
  }

  close(successfully: Boolean) {
    this.onClose.emit(successfully);
    this.open = false;
  }

  checkInstallerId(id: number, installers: InstallerPosition[]) {
    for (const position of installers) {
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
    this.installers = this.installers.concat(installerPosition);
    this.installerListIsOpen = false;
  }

  closeInstallerList(installer: Installer) {
    if (installer != null) {
      if (this.installers !== undefined) {
        if (this.checkInstallerId(installer.id, this.installers)) {
          alert('Такой монтажник уже есть!');
        } else {
          this.addInstaller(installer);
        }
      } else {
        this.installers = [];
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
    let installersMin;
    installersMin = this.cloneObject(this.installers);
    installersMin = installersMin.map(this.brigadeMinMap);
    this.stageService.setInstaller(this.stageId, installersMin).subscribe(data => {
      alert('Монтажники изменены успешно!');
      this.close(true);
    });
  }
}