import {Component, Input, OnInit} from '@angular/core';
import {OrderService} from "../../services/order.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-order-defer',
  templateUrl: './order-defer.component.html',
  styleUrls: ['./order-defer.component.css']
})
export class OrderDeferComponent implements OnInit {
  @Input() order;
  cause;
  comment;

  constructor(private orderService: OrderService) {

  }

  ngOnInit() {
  }
  deferForm = new FormGroup({
    cause: new FormControl(''),
    comment: new FormControl('')
  });

  /*isOpen() {
    return this.lastPage.deferIsOpen();
  }

  ok() {
    this.cause = this.deferForm.get('cause').value;
    this.comment = this.deferForm.get('comment').value;
    this.deferResponse(this.cause, this.comment);
  }

  close(update: boolean) {
    this.reset();
    return this.lastPage.closeDefer(update);
  }

  deferResponse(cause: number, comment: string) {
    this.orderService.deferOrder(cause, comment, this.order.id).subscribe(resp => {
      this.close(true)
    }, err=> {
      console.log('error')
    });
  }

  reset() {
    this.deferForm.reset();
  }*/

}
