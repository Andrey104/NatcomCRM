import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import {OrderService} from '../../services/order.service';

@Component({
  selector: 'app-order-reject',
  templateUrl: './order-dialog-reject.component.html',
  styleUrls: ['./order-dialog-reject.component.css'],
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
export class OrderModalDealComponent implements OnInit {
  id;
  @Input() closable = true;
  @Input() order;
  @Input() visible: boolean;
  @Output() successOrder = new EventEmitter();
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
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  close() {
    this.visible = false;
  }

  submitForm() {
    this.isRequest = true;
    this.isSubmitted = true;
    console.log(this.form);
    this.formData = this.form.value;
    this.orderService.rejectOrder(this.id, this.comment.nativeElement.value, this.form.form.value.answer)
      .subscribe((response) => {
          this.successOrder.emit(response);
          this.isRequest = false;
          this.visible = false;
        },
        (error) => {
          this.isRequest = false;
          alert('Произошла ошибка');
        });
  }

}
