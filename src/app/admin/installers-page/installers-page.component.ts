import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../services/order.service';
import {InstallersService} from '../../services/installers.service';
import {InstallerPosition} from '../../models/installers/installer_position';
import {log} from 'util';
import {Installer} from '../../models/installers/installer';
import {InstallersPage} from '../../models/installers/installers_page';

@Component({
  selector: 'app-installers-page',
  templateUrl: './installers-page.component.html',
  styleUrls: ['./installers-page.component.css']
})
export class InstallersPageComponent implements OnInit {
  installers: Installer[];
  editInstallerModalIsOpen = false;
  modalIsOpen = false;


  constructor(private installerService: InstallersService) {
  }

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
    this.modalIsOpen = true;
  }
  editInstallerModalClose() {
    this.editInstallerModalIsOpen = false;
    this.modalIsOpen = false;
  }

}
