import {Component, EventEmitter, OnInit} from '@angular/core';
import {OrderService} from '../../services/order.service';
import {InstallersService} from '../../services/installers.service';
import {InstallerPosition} from '../../models/installers/installer_position';
import {log} from 'util';
import {Installer} from '../../models/installers/installer';
import {InstallersPage} from '../../models/installers/installers_page';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-installers-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css']
})
export class SettingsPageComponent implements OnInit {
  modalIsOpen = false;
  constructor() {
  }

  ngOnInit() {
  }
  onActivate(event: EventEmitter<number>) {
    alert('activate');
  }
  onDeactivate(event: EventEmitter<number>) {
    alert('deactivate');
  }


}
