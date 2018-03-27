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
  public mask = ['+', '7', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];


  constructor(private clientService: ClientService) {
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
    const clientServer = this.getClientFromTheForm();
    this.subOnChangeClient = this.clientService.refreshClient(clientServer)
      .subscribe((client) => {
        this.valueVariables();
        this.successChangeClient.emit(client);
        this.visibleChange.emit(this.visible);
      }, (err) => {
        if (err.error.email) {
          alert('Введен некоректный e-mail');
        } else if (err.error.phones) {
          alert('Введенный телефон уже существует в базе, проверьте правильность написания номера телефона');
        }
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
    const lastPhone = this.phones.length - 1;
    if (this.phones[lastPhone].number !== '') {
      this.phones.push(new Phone('', null));
    }
  }

  phoneNumber(phoneId: number, phone: string) {
    const phoneWithoutMask = this.phoneMaskOff(phone);
    if (phoneWithoutMask.length === 10) {
      this.successPhones = true;
      this.phones[phoneId].number = phone;
    } else {
      this.successPhones = false;
    }
  }

  phoneComment(phoneId: number, comment: string) {
    if (comment !== '') {
      this.phones[phoneId].comment = comment;
    } else {
      this.phones[phoneId].comment = null;
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

  valueVariables() {
    this.form.reset();
    this.phones = [];
    this.successPhones = true;
    this.visible = false;
  }

  onClose() {
    this.valueVariables();
    this.successChangeClient.emit(this.clientCopy);
    this.visibleChange.emit(this.visible);
    this.client = null;
  }

}
