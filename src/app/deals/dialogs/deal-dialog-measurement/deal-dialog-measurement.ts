import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DealService} from '../../../services/deal.service';
import {NgForm} from '@angular/forms';
import {MeasurementService} from '../../../services/measurement.service';

@Component({
  selector: 'app-dialog-deal-measurement',
  templateUrl: './deal-dialog-measurement.html',
  styleUrls: ['./deal-dialog-measurement.css'],
})
export class DealDialogMeasurementComponent implements OnInit {
  id;
  @Input() closable = true;
  @Input() deal;
  @Input() visible: boolean;
  @ViewChild('form') form: NgForm;
  @Output() successDealMeasurement = new EventEmitter();
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  isSubmitted = false;
  isRequest = false;
  formData = {};

  constructor(private activatedRoute: ActivatedRoute,
              private dealService: DealService,
              private measurementService: MeasurementService) {
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
    this.measurementService.newMeasurement(this.id, this.form.form.value.payment,
                                            this.form.form.value.calendar,
                                            this.form.form.value.commentTime)
                                            .subscribe((result) => {
      this.isRequest = false;
      this.visibleChange.emit(this.visible);
      this.successDealMeasurement.emit(result);
      this.close();
    }, (error) => {
      this.isRequest = false;
      if (error.status === 200) {
        this.visibleChange.emit(this.visible);
        this.successDealMeasurement.emit();
        this.close();
      } else {
        alert('Произошла ошибка');
      }
    });
  }

}


