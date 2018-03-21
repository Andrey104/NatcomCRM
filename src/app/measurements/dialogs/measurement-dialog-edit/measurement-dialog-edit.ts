import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DealService} from '../../../services/deal.service';
import {NgForm} from '@angular/forms';
import {DealMeasurement} from '../../../models/deal/deal_measurement';
import {MeasurementService} from '../../../services/measurement.service';

@Component({
  selector: 'app-measurement-edit',
  templateUrl: './measurement-dialog-edit.html',
  styleUrls: ['./measurement-dialog-edit.css'],
})
export class MeasurementDialogEditComponent implements OnInit {
  id;
  @Input() closable = true;
  @Input() measurement: DealMeasurement;
  @Input() visible: boolean;
  @ViewChild('form') form: NgForm;
  @Output() successMeasurementEdit = new EventEmitter();
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  causes = [1, 2, 3];
  isSubmitted = false;
  isRequest = false;
  formData = {};

  constructor(private activatedRoute: ActivatedRoute,
              private measurementsService: MeasurementService) {
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
    this.measurementsService.editMeasurement(this.measurement.id,
      this.form.form.value.time, this.form.form.value.description)
      .subscribe((result) => {
        this.isRequest = false;
        this.visibleChange.emit(this.visible);
        this.successMeasurementEdit.emit();
        this.close();
      }, (error) => {
        this.isRequest = false;
        if (error.status === 200) {
          this.visibleChange.emit(this.visible);
          this.successMeasurementEdit.emit();
          this.close();
        } else {
          alert('Произошла ошибка');
        }
      });
  }

}
