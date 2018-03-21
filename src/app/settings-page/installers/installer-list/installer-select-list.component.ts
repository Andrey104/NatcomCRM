import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {log} from 'util';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Installer} from '../../../models/installers/installer';
import {InstallersService} from '../../../services/installers.service';

@Component({
  selector: 'app-installer-select-list',
  templateUrl: './installer-select-list.component.html',
  styleUrls: ['./installer-select-list.component.css']
})
export class InstallerSelectListComponent implements OnInit {
  installers: Installer[];
  modalState: {open: Boolean, installer?: Installer } = {open: false, installer: null};
  modal: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);

  constructor(private installerService: InstallersService) {
  }
  @Input() open;
  @Output() onClose = new EventEmitter<Installer>();

  ngOnInit() {
    this.show();
  }
  show() {
    this.load(null);
  }
  close(installer?: Installer) {
      this.onClose.emit(installer);
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
}
