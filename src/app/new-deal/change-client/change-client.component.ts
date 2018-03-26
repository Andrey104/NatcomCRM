import {Component, EventEmitter, Input, OnChanges, Output, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Client} from '../../models/clients/client';
import {Phone} from '../../models/phone';
import {Subscription} from 'rxjs/Subscription';
import {ClientService} from '../../services/client.service';

@Component({
  selector: 'app-change-client',
  templateUrl: './change-client.component.html',
  styleUrls: ['./change-client.component.css']
})
export class ChangeClientComponent implements OnChanges {
  @Input() visible: boolean;
  @Input() client: Client;
  @Output() successChangeClient = new EventEmitter<Client>();
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('form') form: NgForm;
  clientCopy: Client;
  phones: Phone[] = [];
  closable = true;
  successPhones = true;
  subOnChangeClient: Subscription;
  changeName = false;
  changeEmail = false;
  changePhone = false;
  changeComment = false;
  public mask = ['+', '7', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];


  constructor(private clientService: ClientService) {
  }

  ngOnChanges() {
    if (this.client !== null) {
      this.clientCopy = JSON.parse(JSON.stringify(this.client));
      console.log(this.clientCopy);
      for (const phone of this.client.phones) {
        this.phones.push(phone);
      }
      for (const phone of this.phones) {
        phone.number = this.phoneMaskOn(phone.number);
      }
    }
  }

  submitForm() {
    const clientServer = this.getClientFromTheForm();
    this.subOnChangeClient = this.clientService.refreshClient(clientServer)
      .subscribe((client) => {
        this.form.reset();
        this.phones = [];
        this.visible = false;
        this.successPhones = true;
        this.changePhone = false;
        this.changeComment = false;
        this.successChangeClient.emit(client);
        this.visibleChange.emit(this.visible);
      }, (err) => {
        alert('Произошла ошибка');
      }, () => {
        this.subOnChangeClient.unsubscribe();
      });
  }

  getClientFromTheForm(): Client {
    const name = this.form.form.value.clientName;
    const email = this.form.form.value.email;
    let phonesForServer = [];
    for (const phone of this.phones) {
      const newPhone = this.phoneMaskOff(phone.number);
      phonesForServer.push(new Phone(newPhone, phone.comment));
    }
    const clientServer = new Client(name, email, phonesForServer);
    clientServer.id = this.client.id;
    phonesForServer = null;
    return clientServer;
  }

  addPhone() {
    this.successPhones = false;
    this.changePhone = false;
    const lastPhone = this.phones.length - 1;
    if (this.phones[lastPhone].number !== '') {
      this.phones.push(new Phone('', null));
    }
  }

  phoneNumber(phoneId: number, phone: string) {
    if (phone !== '') {
      this.phones[phoneId].number = phone;
      const numberWithoutMask = this.phoneMaskOff(phone);
      if (numberWithoutMask.length === 10) {
        this.successPhones = true;
        if (this.clientCopy.phones[phoneId]) {
          if (numberWithoutMask !== this.clientCopy.phones[phoneId].number) {
            this.changePhone = true;
          } else {
            this.changePhone = false;
          }
        } else {
          this.changePhone = true;
        }
      } else {
        this.successPhones = false;
        this.changePhone = false;
      }
    } else {
      this.changePhone = false;
      this.phones[phoneId].number = null;
    }
  }

  phoneComment(phoneId: number, comment: string) {
    this.phones[phoneId].comment = comment;
    if (this.clientCopy.phones[phoneId]) {
      if (this.clientCopy.phones[phoneId].comment !== comment) {
        this.changeComment = true;
      } else {
        this.changeComment = false;
      }
    } else {
      this.changeComment = true;
    }
    if (comment === '') {
      this.phones[phoneId].comment = null;
    }
  }

  changeClientName(name: string) {
    if (name !== '') {
      if (this.clientCopy.fio) {
        if (this.clientCopy.fio !== name) {
          this.changeName = true;
        } else {
          this.changeName = false;
        }
      } else {
        this.changeName = true;
      }
    } else {
      this.changeName = false;
    }
  }

  changeClientEmail(email: string) {
    if (this.clientCopy.email) {
      if (this.clientCopy.email !== email) {
        this.changeEmail = true;
      } else {
        this.changeEmail = false;
      }
    } else {
      this.changeEmail = true;
    }
  }

  removePhone(phoneNumber: number) {
    if (this.phones.length !== 1) {
      this.phones.splice(phoneNumber, 1);
    }
    this.checkPhones();
  }

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

  checkPhones() {
    for (const phone of this.phones) {
      if (phone.number === '') {
        this.successPhones = false;
        break;
      } else {
        this.successPhones = true;
      }
    }
  }

  changeClient(): boolean {
    if (this.changePhone || this.changeComment) {
      return true;
    } else {
      return false;
    }
  }

  onClose() {
    this.form.reset();
    this.successPhones = true;
    this.changeName = false;
    this.changeEmail = false;
    this.changePhone = false;
    this.changeComment = false;
    this.phones = [];
    this.visible = false;
    this.successChangeClient.emit(this.clientCopy);
    this.visibleChange.emit(this.visible);
    this.client = null;
  }

}
