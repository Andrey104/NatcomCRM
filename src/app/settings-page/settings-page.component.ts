import {Component, OnInit} from '@angular/core';
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
        this.modalIsOpen = next;
      });
    this.subscriptions.push(modal);
  }
  onDeactivate() {
    this.subscriptions
      .forEach(s => s.unsubscribe());
  }

}
