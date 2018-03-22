import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ClientService} from '../../services/client.service';
import {Phone} from '../../models/phone';
import {Client} from '../../models/client';
import {Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css'],
})
export class AddClientComponent implements OnInit {
  @Input() visible: boolean;
  @Output() successClient = new EventEmitter<Client>();
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('form') form: NgForm;
  phones: Phone[] = [];
  closable = true;
  successPhones = false;
  subOnClientPhone: Subscription;
  subOnAddClient: Subscription;
  regularClient: Client;
  regularClientNumber: number;
  public mask = ['+', '7', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];

  constructor(private clientService: ClientService) {
  }

  ngOnInit(): void {
    this.phones.push(new Phone('', null));
  }

  submitForm() {
    console.log(this.regularClient);
    if (this.regularClient === undefined) {
      this.addClient();
    } else {
      this.changeClient();
    }
  }

  addClient() {
    let clientForServer = this.getClientFromTheForm();
    this.subOnAddClient = this.clientService.addClient(clientForServer)
      .subscribe((client) => {
        this.successClient.emit(client);
        this.onClose();
      }, (err) => {
        console.log(err);
      }, () => {
        clientForServer = null;
        this.subOnAddClient.unsubscribe();
      });
  }

  changeClient() {
    let clientForServer = this.getClientFromTheForm();
    console.log(clientForServer);
    this.subOnAddClient = this.clientService.refreshClient(clientForServer)
      .subscribe((client) => {
        this.successClient.emit(client);
        this.onClose();
      }, (err) => {
        console.log(err);
      }, () => {
        clientForServer = null;
        this.subOnAddClient.unsubscribe();
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
    const client = new Client(name, email, phonesForServer);
    phonesForServer = null;
    return client;
  }

  addPhone() {
    this.successPhones = false;
    const lastPhone = this.phones.length - 1;
    if (this.phones[lastPhone].number !== '') {
      this.phones.push(new Phone('', null));
    }
  }

  phoneNumber(phoneId: number, phone: string) {
    let newPhone = '';
    this.phones[phoneId].number = phone;
    newPhone = this.phoneMaskOff(phone);
    if (newPhone.length === 10) {
      if (!this.successPhones) {
        this.successPhones = true;
        this.subOnClientPhone = this.clientService.getClientByPhone(newPhone)
          .subscribe((clientPage) => {
            this.regularClient = clientPage.results[0];
            this.regularClientNumber = phoneId;
          }, (err) => {
            console.log(err);
          }, () => {
            this.subOnClientPhone.unsubscribe();
          });
      }
    } else {
      this.regularClient = null;
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

  removePhone(phoneId: number) {
    if (this.phones.length !== 1) {
      this.phones.splice(phoneId, 1);
    }
    this.checkPhones();
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

  addRegularClient() {
    this.form.reset();
    this.phones = [];
    for (let i = 0; i < this.regularClient.phones.length; i++) {
      if (this.phones[i] === undefined) {
        this.phones.push(new Phone('', null));
      }
      this.phones[i].number = this.phoneMaskOn(this.regularClient.phones[i].number);
      this.phones[i].comment = this.regularClient.phones[i].comment;
    }
    this.form.form.patchValue({
        clientName: this.regularClient.fio,
        email: this.regularClient.email
      }
    );
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

  onClose() {
    this.phones = [];
    this.phones.push(new Phone('', null));
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
