import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DealService} from '../../../services/deal.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-dialog-deal-discount',
  templateUrl: './deal-dialog-discount.html',
  styleUrls: ['./deal-dialog-discount.css'],
})
export class DealDialogDiscountComponent implements OnInit {
  id;
  @Input() closable = true;
  @Input() deal;
  @Input() visible: boolean;
  @ViewChild('form') form: NgForm;
  @Output() successDealDiscount = new EventEmitter();
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
    this.dealService.dealDiscount(this.id, Number(this.form.form.value.after),
      this.form.form.value.comment)
      .subscribe((result) => {
        this.isRequest = false;
        this.visibleChange.emit(this.visible);
        this.successDealDiscount.emit(result);
        this.close();
      }, (error) => {
        this.isRequest = false;
        alert('Произошла ошибка');
      });
  }

}


