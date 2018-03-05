import {Component, ComponentRef, EventEmitter, OnInit} from '@angular/core';
import {OrderService} from '../../services/order.service';
import {InstallersService} from '../../services/installers.service';
import {InstallerPosition} from '../../models/installers/installer_position';
import {log} from 'util';
import {Installer} from '../../models/installers/installer';
import {InstallersPage} from '../../models/installers/installers_page';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-installers-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css']
})
export class SettingsPageComponent implements OnInit {
  modalIsOpen = false;
  private subscriptions: Subscription[] = [];
  constructor() {
  }

  ngOnInit() {
  }
  /* c- component instance
   * onActivate is called when router changes
   * onActivate subscribe to change modalIsOpen
   * onDeactivate unsubscribe all subscription
   */
  onActivate(c) {
    const modal = c.modal
      .subscribe(next => {
        if (next) {
          this.modalIsOpen = true;
        } else {
          this.modalIsOpen = false;
        }
      });
    this.subscriptions.push(modal);
  }
  onDeactivate(c) {
    this.subscriptions
      .forEach(s => s.unsubscribe());
  }

}
