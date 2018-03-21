import {Component, OnInit} from '@angular/core';
import {log} from 'util';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {InstallersService} from '../../services/installers.service';
import {Installer} from '../../models/installers/installer';

@Component({
  selector: 'app-installers',
  templateUrl: './installers.component.html',
  styleUrls: ['../settings-page.component.css']
})
export class InstallersComponent implements OnInit {
  installers: Installer[];
  modalState: {open: Boolean, installer?: Installer } = {open: false, installer: null};
  modal: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);

  constructor(private installerService: InstallersService) {
  }

  ngOnInit() {
    this.show();
  }
  show() {
    this.load(null);
  }

  load(page?: number): void {
    if (page == null) {
      page = 1;
      this.installerService.getInstallers()
        .subscribe(installers => {
          this.installers = installers.results;
          if (installers.next != null) {
            this.load(page + 1);
          }
        }, error2 => {
          log(error2);
        });
    } else {
      this.installerService.getInstallers(page.toString())
        .subscribe(installers => {
          this.installers = this.installers.concat(installers.results);
          if (installers.next != null) {
            this.load(page + 1);
          }
        }, error2 => {
          log(error2);
        });
    }
  }
  openModal(installer?: Installer) {
    this.modalState = {open: true, installer: installer};
    this.modal.next(true);
  }

  editModalClose(successfully) {
    if (successfully) {
      this.show();
    }
    this.modalState.open = false;
    this.modal.next(false);
  }
}
