import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from '../../services/order.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-order-defer-dialog',
  templateUrl: './order-defer-dialog.component.html',
  styleUrls: ['./order-defer-dialog.component.css'],
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
export class OrderDeferDialogComponent implements OnInit {
  id;
  @Input() closable = true;
  @Input() order;
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() successOrder = new EventEmitter();
  @ViewChild('form') form: NgForm;
  @ViewChild('comment') comment;
  causes = [1, 2, 3];
  isSubmitted = false;
  formData = {};

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
    this.visibleChange.emit(this.visible);
  }

  submitForm() {
    this.isSubmitted = true;
    console.log(this.form);
    this.formData = this.form.value;
    this.orderService.deferOrder(this.id, this.comment.nativeElement.value, this.form.form.value.answer)
      .subscribe((response) => {
          this.successOrder.emit(response);
          this.visible = false;
          this.visibleChange.emit(this.visible);
        },
        (error) => {
          console.log(error);//добавить хуйню, чтобы пользователь понял, что нихуя не отправилось в самой модалке
        });
  }


}
