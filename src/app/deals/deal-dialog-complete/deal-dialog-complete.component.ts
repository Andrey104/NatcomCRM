import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import {OrderService} from '../../services/order.service';
import {DealService} from '../../services/deal.service';

@Component({
  selector: 'app-deal-complete',
  templateUrl: './deal-dialog-complete.component.html',
  styleUrls: ['./deal-dialog-complete.component.css'],
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
export class DealDialogCompleteComponent implements OnInit {
  id;
  @Input() closable = true;
  @Input() deal;
  @Input() visible: boolean;
  @Output() successDeal = new EventEmitter();
  isSubmitted = false;
  formData = {};

  constructor(private activatedRoute: ActivatedRoute,
              private dealService: DealService) {
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
    this.isSubmitted = true;
    this.dealService.dealComplete(this.id).subscribe((result) => {
      this.visible = false;
    });
    // this.orderService.rejectOrder(this.id, this.comment.nativeElement.value, this.form.form.value.answer)
    //   .subscribe((response) => {
    //       this.successOrder.emit(response);
    //       this.visible = false;
    //       this.visibleChange.emit(this.visible);
    //     },
    //     (error) => {
    //       console.log(error);//добавить хуйню, чтобы пользователь понял, что нихуя не отправилось в самой модалке
    //     });
  }

}
