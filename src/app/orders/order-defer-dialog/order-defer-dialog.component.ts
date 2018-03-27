import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from '../../services/order.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-order-defer-dialog',
  templateUrl: './order-defer-dialog.component.html',
  styleUrls: ['./order-defer-dialog.component.css'],
})
export class OrderDeferDialogComponent implements OnInit {
  id;
  closable = true;
  @Input() order;
  @Input() visible: boolean;
  @Output() successOrder = new EventEmitter();
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('form') form: NgForm;
  @ViewChild('comment') comment;
  causes = [1, 2];
  isSubmitted = false;
  formData = {};
  isRequest = false;

  constructor(private activatedRoute: ActivatedRoute,
              private orderService: OrderService) {
  }


  ngOnInit() {
    this.activatedRoute.params
      .subscribe(params => {
        this.id = params['id'];
      });
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  submitForm() {
    this.isRequest = true;
    this.isSubmitted = true;
    this.formData = this.form.value;
    this.orderService.deferOrder(this.id, this.comment.nativeElement.value, this.form.form.value.answer)
      .subscribe((response) => {
          this.successOrder.emit(response);
          this.isRequest = false;
          this.close();
        },
        (error) => {
          this.isRequest = false;
          alert('Произошла ошибка');
        });
  }


}
