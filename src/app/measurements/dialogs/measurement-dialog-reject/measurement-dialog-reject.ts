import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import {DealMeasurement} from '../../../models/deal/deal_measurement';
import {MeasurementService} from '../../../services/measurement.service';

@Component({
  selector: 'app-measurement-reject',
  templateUrl: './measurement-dialog-reject.html',
  styleUrls: ['./measurement-dialog-reject.css'],
})
export class MeasurementDialogRejectComponent implements OnInit {
  id;
  @Input() closable = true;
  @Input() measurement: DealMeasurement;
  @Input() visible: boolean;
  @ViewChild('form') form: NgForm;
  @Output() successRejectMeasurement = new EventEmitter();
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  causes = [1, 2, 3];
  isSubmitted = false;
  isRequest = false;
  formData = {};

  constructor(private activatedRoute: ActivatedRoute,
              private measurementService: MeasurementService) {
  }


  ngOnInit() {
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  submitForm() {
    this.isRequest = true;
    this.isSubmitted = true;
    this.formData = this.form.value;
    if (this.measurement.status === 5) {
      this.measurementService.reviewRejectMeasurement(this.measurement.reject_id, this.form.form.value.answer,
        this.form.form.value.comment).subscribe((result) => {
        this.isRequest = false;
        this.visibleChange.emit(this.visible);
        this.successRejectMeasurement.emit();
        this.close();
      }, (error) => {
        this.isRequest = false;
        if (error.status === 200) {
          this.visibleChange.emit(this.visible);
          this.successRejectMeasurement.emit();
          this.close();
        } else {
          alert('Произошла ошибка');
        }
      });
    } else {
      this.measurementService.rejectMeasurement(this.measurement.id, this.form.form.value.answer,
        this.form.form.value.comment).subscribe((result) => {
        this.isRequest = false;
        this.visibleChange.emit(this.visible);
        this.successRejectMeasurement.emit();
        this.close();
      }, (error) => {
        this.isRequest = false;
        if (error.status === 200) {
          this.visibleChange.emit(this.visible);
          this.successRejectMeasurement.emit();
          this.close();
        } else {
          alert('Произошла ошибка');
        }
      });
    }

  }

}
