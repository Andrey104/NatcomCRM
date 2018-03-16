import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {NgForm} from '@angular/forms';
import {ClientService} from '../../services/client.service';

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
export class AddClientComponent implements OnInit {
  @Input() visible: boolean;
  @Output() successClient = new EventEmitter();
  closable = true;

  constructor(private clientService: ClientService) {
  }

  ngOnInit() {
  }

  submitForm(form: NgForm) {
    const name = form.form.value.clientName;
    const phone = form.form.value.phone;
    this.clientService.addClient(name, phone)
      .subscribe((response) => {
        console.log(response);
      });
  }

  onClose() {
    this.visible = false;
  }
}
