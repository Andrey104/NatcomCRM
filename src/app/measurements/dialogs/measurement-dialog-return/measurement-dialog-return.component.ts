import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {DealMeasurement} from '../../../models/deal/deal_measurement';
import {MeasurementService} from '../../../services/measurement.service';

@Component({
  selector: 'app-measurement-return',
  templateUrl: './measurement-dialog-return.component.html',
  styleUrls: ['./measurement-dialog-return.component.css'],
})
export class MeasurementDialogReturnComponent implements OnInit {
  id;
  @Input() closable = true;
  @Input() measurement: DealMeasurement;
  @Input() visible: boolean;
  @ViewChild('form') form: NgForm;
  @Output() success = new EventEmitter();
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  isSubmitted = false;
  isRequest = false;
  formData = {};

  constructor(private measurementService: MeasurementService) {
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
    this.measurementService.returnMeasurement(this.measurement.id,
      this.form.form.value.comment).subscribe((result) => {
      this.isRequest = false;
      this.visibleChange.emit(this.visible);
      this.success.emit();
      this.close();
    }, (error) => {
      this.isRequest = false;
      if (error.status === 200) {
        this.visibleChange.emit(this.visible);
        this.success.emit();
        this.close();
      } else {
        alert('Произошла ошибка');
      }
    });
  }

}
