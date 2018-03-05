import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OrderService} from "../../services/order.service";
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-order-defer',
  templateUrl: './order-defer.component.html',
  styleUrls: ['./order-defer.component.css']
})
export class OrderDeferComponent implements OnInit {
  id;
  cause;
  comment;
  error = false;
  errorMessage = 'Пустой коммент';
  @Input() openDefer: boolean;
  @Output() close = new EventEmitter();

  constructor(private orderService: OrderService, private activatedRoute: ActivatedRoute) {
  }
  deferForm: FormGroup = new FormGroup({
    cause: new FormControl('', Validators.required),
    comment: new FormControl('', Validators.required),
  });

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => this.id = params['id']);
  }
  ok() {
    this.cause = this.deferForm.get('cause').value;
    this.comment = this.deferForm.get('comment').value;
    if (this.cause === '' || this.comment === '' || this.comment === null || this.cause === null) {
      this.error = true;
      this.errorMessage = 'Заполните все поля';
    } else {
      this.deferResponse(this.cause, this.comment);
    }
  }
  deferResponse(cause: number, comment: string) {
    this.orderService.deferOrder(cause, comment, this.id).subscribe(resp => {
      this.onClose();
    }, err => {
      console.log('error');
    });
  }
  onClose() {
    this.errorMessage = '';
    this.deferForm.reset();
    this.close.emit();
  }
}
