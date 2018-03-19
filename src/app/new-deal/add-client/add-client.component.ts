import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {NgForm} from '@angular/forms';
import {ClientService} from '../../services/client.service';
import {Phone} from '../../models/phone';
import {Client} from '../../models/client';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({transform: 'scale3d(.3, .3, .3)'}),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({transform: 'scale3d(.0, .0, .0)'}))
      ])
    ])
  ]
})
export class AddClientComponent implements OnChanges {
  @Input() visible: boolean;
  @Output() successClient = new EventEmitter<Client>();
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  phones: Phone[] = [];
  closable = true;

  constructor(private clientService: ClientService) {
  }

  ngOnChanges(): void {
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
    this.phones.push(new Phone('', ''));
  }

  phoneNumber(phoneId: number, phone: string) {
    this.phones[phoneId].number = phone;
  }

  phoneComment(phoneId: number, comment: string) {
    this.phones[phoneId].comment = comment;
  }

  removePhone(phoneId: number) {
    this.phones.splice(phoneId, 1);
  }

  onClose() {
    this.phones = [];
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
