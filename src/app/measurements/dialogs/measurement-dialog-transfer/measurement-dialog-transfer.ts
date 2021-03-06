import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DealService} from '../../../services/deal.service';
import {NgForm} from '@angular/forms';
import {MeasurementService} from '../../../services/measurement.service';

@Component({
  selector: 'app-measurement-transfer',
  templateUrl: './measurement-dialog-transfer.html',
  styleUrls: ['./measurement-dialog-transfer.css'],
})
export class MeasurementDialogTransferComponent implements OnInit {
  id;
  @Input() closable = true;
  @Input() measurement;
  @Input() visible: boolean;
  @ViewChild('form') form: NgForm;
  @Output() successTransferMeasurement = new EventEmitter();
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  causes = [1, 2];
  isSubmitted = false;
  isRequest = false;
  formData = {};

  constructor(private activatedRoute: ActivatedRoute,
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
    this.measurementService.transferMeasurement(this.measurement.id,
      this.form.form.value.cause,
      this.form.form.value.new_date,
      this.form.form.value.comment).subscribe((result) => {
      this.isRequest = false;
      this.visibleChange.emit(this.visible);
      this.successTransferMeasurement.emit();
      this.close();
    }, (error) => {
      this.isRequest = false;
      if (error.status === 200) {
        this.visibleChange.emit(this.visible);
        this.successTransferMeasurement.emit();
        this.close();
      } else {
        alert('Произошла ошибка');
      }
    });
  }

}
