import {Component, OnInit} from '@angular/core';
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
  installerModalState: { open: Boolean, installer?: Installer } = {open: false, installer: null};
  modal: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);

  constructor(private installerService: InstallersService) {
  }

  ngOnInit() {
    this.showInstallers();
  }
  showInstallers() {
    this.loadInstallers(null);
  }

  loadInstallers(page?: number): void {
    if (page == null) {
      page = 1;
      this.installerService.getInstallers()
        .subscribe(installers => {
          this.installers = installers.results;
          if (installers.next != null) {
            this.loadInstallers(page + 1);
          }
        }, error2 => {
          log(error2);
        });
    } else {
      this.installerService.getInstallers(page.toString())
        .subscribe(installers => {
          this.installers = this.installers.concat(installers.results);
          if (installers.next != null) {
            this.loadInstallers(page + 1);
          }
        }, error2 => {
          log(error2);
        });
    }
  }

  openInstallerModal(installer?: Installer) {
    this.installerModalState = {open: true, installer: installer};
    this.openModal(true);
  }

  editInstallerModalClose(successfully) {
    if (successfully) {
      this.showInstallers();
    }
    this.installerModalState.open = false;
    this.openModal(false);
  }

  openModal(open: Boolean) {
    this.modal.next(open);
  }
}
