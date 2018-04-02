import {Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Client} from '../../../models/clients/client';
import {Phone} from '../../../models/phone';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-deal-dialog-client-info',
  templateUrl: './deal-dialog-client-info.component.html',
  styleUrls: ['./deal-dialog-client-info.component.css']
})
export class DealDialogClientInfoComponent implements OnChanges {
  @Input() visible: boolean;
  @Input() client: Client;
  @Input() showEditButtons: boolean;
  @Output() successClientInfoDialog = new EventEmitter<Client>();
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('form') form: NgForm;
  closable = true;
  clientCopy: Client;
  phones: Phone[] = [];
  // forwardUrl: string;
  url: string;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.url = this.document.location.href;
  }

  ngOnChanges() {
    if (this.client !== null) {
      this.clientCopy = JSON.parse(JSON.stringify(this.client));
      for (const phone of this.client.phones) {
        this.phones.push(phone);
      }
      for (const phone of this.phones) {
        phone.number = this.phoneMaskOn(phone.number);
      }
    }
  }

  submitForm() {
    this.resetValue();
    this.successClientInfoDialog.emit(this.clientCopy);
  }

  // getForwardUrl() {
  //   if (this.url.indexOf('deals')) {
  //     this.forwardUrl =
  //   }
  // }

  phoneMaskOn(phoneNumber: string) {
    return '+7(' + phoneNumber.slice(0, 3) + ') ' + phoneNumber.slice(3, 6) +
      '-' + phoneNumber.slice(6, 8) + '-' + phoneNumber.slice(8, 10);
  }

  phoneMaskOff(phoneNumber: string) {
    let newPhone = '';
    for (let i = 3; i < phoneNumber.length; i++) {
      if (phoneNumber[i] !== ')' && phoneNumber[i] !== '-' && phoneNumber[i] !== '_' && phoneNumber[i] !== ' ') {
        newPhone += phoneNumber[i];
      }
    }
    return newPhone;
  }

  resetValue() {
    this.form.reset();
    this.client = null;
    this.phones = [];
    this.visible = !this.visible;
    this.visibleChange.emit(this.visible);
  }

  onClose() {
    this.resetValue();
    this.successClientInfoDialog.emit(this.client);
  }
}
