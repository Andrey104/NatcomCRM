import {Component, EventEmitter, Input,  OnInit, Output,  ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DealService} from '../../../services/deal.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-measurement-reject',
  templateUrl: './measurement-dialog-reject.html',
  styleUrls: ['./measurement-dialog-reject.css'],
})
export class MeasurementDialogRejectComponent implements OnInit {
  id;
  @Input() closable = true;
  @Input() measurement;
  @Input() visible: boolean;
  @ViewChild('form') form: NgForm;
  @Output() successDeal = new EventEmitter();
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  causes = [1, 2, 3];
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
    this.dealService.dealReject(this.id, this.form.form.value.answer, this.form.form.value.comment).subscribe((result) => {
      this.isRequest = false;
      this.visibleChange.emit(this.visible);
      this.successDeal.emit();
      this.close();
    }, (error) => {
      this.isRequest = false;
      if (error.status === 200) {
        this.visibleChange.emit(this.visible);
        this.successDeal.emit();
        this.close();
      } else {
        alert('Произошла ошибка');
      }
    });
  }

}
