import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {log} from 'util';
import {InstallersService} from '../../../services/installers.service';
import {Installer} from '../../../models/installers/installer';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-installers',
  templateUrl: './installers.component.html',
  styleUrls: ['./installers.component.css']
})
export class InstallersComponent implements OnInit {
  installers: Installer[];
  editInstallerModalIsOpen = false;
  modal: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);

  @Output() onModalOpen = new EventEmitter<number>();
  /* 0 - installerEdit */

  constructor(private installerService: InstallersService) { }

  ngOnInit() {
    this.showInstallers();
  }
  showInstallers(): void {
    this.installerService.getInstallers()
      .subscribe(installers => {
        this.installers = installers.results;
      }, error2 => {
        log(error2);
      });
  }
  openEditInstallerModal() {
    this.editInstallerModalIsOpen = true;
    this.openModal(true);
  }
  editInstallerModalClose() {
    this.editInstallerModalIsOpen = false;
    this.openModal(false);
  }
  openModal(open: Boolean) {
    this.modal.next(open);
  }
}
