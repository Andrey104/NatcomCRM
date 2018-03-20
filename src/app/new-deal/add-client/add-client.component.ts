import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ClientService} from '../../services/client.service';
import {Phone} from '../../models/phone';
import {Client} from '../../models/client';
import {ErrorForm} from '../../models/error-form';


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
  errorForm: ErrorForm = null;

  constructor(private clientService: ClientService) {
  }

  ngOnInit(): void {
    this.phones.push(new Phone('', ''));
  }

  submitForm(form: NgForm) {
    const name = form.form.value.clientName;
    const email = form.form.value.email;
    this.clientService.addClient(name, email, this.phones)
      .subscribe((client) => {
        this.successClient.emit(client);
        this.visible = false;
      });
  }

  addPhone() {
    const lastPhone = this.phones.length - 1;
    if (this.phones[lastPhone].number !== '') {
      this.phones.push(new Phone('', ''));
    } else {
      this.showError('error', 'Необходимо заполинть все номера телефонов');
    }
  }

  phoneNumber(phoneId: number, phone: string) {
    this.phones[phoneId].number = phone;
  }

  phoneComment(phoneId: number, comment: string) {
    this.phones[phoneId].comment = comment;
  }

  removePhone(phoneId: number) {
    if (this.phones.length !== 1) {
      this.phones.splice(phoneId, 1);
    } else {
      this.showError('error', 'Нельзя добавить клиента без телефона');
    }
  }

  showError(type: string, message: string) {
    this.errorForm = null;
    this.errorForm = new ErrorForm(type, message);
    window.setTimeout(() => {
      if (this.errorForm.message === message) {
        this.errorForm = null;
      }
    }, 5000);
  }

  onClose() {
    this.phones = [];
    this.phones.push(new Phone('', ''));
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
