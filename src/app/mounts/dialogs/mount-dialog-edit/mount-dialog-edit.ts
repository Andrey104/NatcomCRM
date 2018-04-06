import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DealService} from '../../../services/deal.service';
import {NgForm} from '@angular/forms';
import {DealMeasurement} from '../../../models/deal/deal_measurement';
import {MeasurementService} from '../../../services/measurement.service';
import {DealMount} from '../../../models/deal/deal_mount';
import {MountService} from '../../../services/mount.service';

@Component({
  selector: 'app-mount-edit',
  templateUrl: './mount-dialog-edit.html',
  styleUrls: ['./mount-dialog-edit.css'],
})
export class MountEditDialogComponent implements OnInit {
  id;
  @Input() closable = true;
  @Input() mount: DealMount;
  @Input() visible: boolean;
  @ViewChild('form') form: NgForm;
  @Output() successMountEdit = new EventEmitter();
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  isSubmitted = false;
  isRequest = false;
  formData = {};

  constructor(private activatedRoute: ActivatedRoute,
              private mountService: MountService) {
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
    this.mountService.editMount(this.mount.id, this.form.form.value.description, this.mount.date)
      .subscribe((result) => {
        this.isRequest = false;
        this.visibleChange.emit(this.visible);
        this.successMountEdit.emit();
        this.close();
      }, (error) => {
        this.isRequest = false;
        if (error.status === 200) {
          this.visibleChange.emit(this.visible);
          this.successMountEdit.emit();
          this.close();
        } else {
          alert('Произошла ошибка');
        }
      });
  }

}
