import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DealService} from '../../../services/deal.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-dialog-deal-payment',
  templateUrl: './deal-dialog-payment.html',
  styleUrls: ['./deal-dialog-payment.css'],
})
export class DealDialogPaymentComponent implements OnInit {
  id;
  @Input() closable = true;
  @Input() deal;
  @Input() visible: boolean;
  @ViewChild('form') form: NgForm;
  @Output() successDealPayment = new EventEmitter();
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  isSubmitted = false;
  isRequest = false;
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
    this.visibleChange.emit(this.visible);
  }

  submitForm() {
    this.isRequest = true;
    this.isSubmitted = true;
    this.formData = this.form.value;
    console.log(this.form.form.value.sum);
    this.dealService.dealPayment(this.id, this.form.form.value.payment,
      this.form.form.value.calendar,
      this.form.form.value.receiver, Number(this.form.form.value.sum))
      .subscribe((result) => {
        this.isRequest = false;
        this.visibleChange.emit(this.visible);
        this.successDealPayment.emit(result);
        this.close();
      }, (error) => {
        alert('Произошла ошибка');
      });
  }

}


