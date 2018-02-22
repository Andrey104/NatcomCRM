import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {OrderService} from '../../services/order.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-order-reject',
  templateUrl: './order-reject.component.html',
  styleUrls: ['./order-reject.component.css']
})
export class OrderRejectComponent implements OnInit {
  @Input() openReject;
  @Output() close = new EventEmitter();
  id;
  constructor(private orderService: OrderService, private activatedRoute: ActivatedRoute) { }
  rejectForm = new FormGroup({
    cause: new FormControl(''),
    comment: new FormControl('')
  });
  ngOnInit() {
    this.id = this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    });
  }


  /*isOpen() {
    return this.lastPage.rejectIsOpen();
  }

  ok() {
    let cause = this.rejectForm.get('cause').value;
    let comment = this.rejectForm.get('comment').value;
    this.rejectResponse(cause, comment);
  }

  close(update: boolean) {
    this.reset();
    return this.lastPage.closeReject(update);
  }

  rejectResponse(cause: number, comment: string) {
    alert('НУ ТИПА ОТКАЗАЛИ');
    this.close(true);
  }

  reset() {
    this.rejectForm.reset();
  }*/
  onClose() {
    this.close.emit();
    this.rejectForm.reset();
  }
}


