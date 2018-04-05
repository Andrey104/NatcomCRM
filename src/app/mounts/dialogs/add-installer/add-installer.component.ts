import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Installer} from '../../../models/installers/installer';
import {InstallerPosition} from '../../../models/installers/installer_position';
import {Brigade} from '../../../models/brigades/brigade';
import {MountService} from '../../../services/mount.service';

@Component({
  selector: 'app-add-installer',
  templateUrl: './add-installer.component.html',
  styleUrls: ['./add-installer.component.css']
})
export class AddInstallerComponent implements OnInit, OnChanges {
  installers: InstallerPosition[];
  stageId: string;
  installerListIsOpen = false;
  brigadeListIsOpen = false;
  open = false;
  @Input() modalState;
  @Output() onClose = new EventEmitter<Boolean>(); // false - отмена, true - успешное выполнение


  constructor(private mountService: MountService) {
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
    this.installerListIsOpen = false;
    this.brigadeListIsOpen = false;
  }

  checkInstallerId(id: number, installers: InstallerPosition[]) {
    for (const position of installers) {
      if (position.installer.id === id) {
        return true;
      }
    }
    return false;
  }

  addInstallerToArray(installer) {
    let installerPosition;
    installerPosition = new InstallerPosition();
    installerPosition.installer = this.cloneObject(installer);
    this.installers = this.installers.concat(installerPosition);
  }

  addInstaller(installer: Installer) {
    if (this.installers !== undefined) {
      if (this.checkInstallerId(installer.id, this.installers)) {
        alert('Такой монтажник уже есть!');
      } else {
        this.addInstallerToArray(installer);
        this.installerListIsOpen = false;
        this.brigadeListIsOpen = false;
      }
    } else {
      this.installers = [];
      this.addInstallerToArray(installer);
      this.installerListIsOpen = false;
      this.brigadeListIsOpen = false;
    }
  }

  closeInstallerList(installer: Installer) {
    if (installer != null) {
      this.addInstaller(installer);
    } else {
      this.installerListIsOpen = false;
    }
  }

  closeBrigadeList(brigade: Brigade) {
    if (brigade != null) {
      for (const i of brigade.installers) {
        this.addInstaller(i.installer);
      }
    } else {
      this.brigadeListIsOpen = false;
    }
  }

  brigadeMinMap(position: InstallerPosition) {
    position.installer = position.installer.id;
    return position;
  }

  openInstallerList() {
    this.installerListIsOpen = true;
  }
  openBrigadeList() {
    this.brigadeListIsOpen = true;
  }

  ok() {
    let installersMin;
    installersMin = this.cloneObject(this.installers);
    installersMin = installersMin.map(this.brigadeMinMap);
    this.mountService.setInstaller(this.stageId, installersMin).subscribe(data => {
      // alert('Монтажники изменены успешно!');
      this.close(true);
    });
  }
}
