import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DealService} from '../../../services/deal.service';
import {MeasurementService} from '../../../services/measurement.service';

@Component({
  selector: 'app-measurement-delete-photo',
  templateUrl: './measurement-dialog-delete-photo.html',
  styleUrls: ['./measurement-dialog-delete-photo.css'],
})
export class MeasurementDialogDeletePhotoComponent implements OnInit {
  id;
  @Input() closable = true;
  @Input() measurement;
  @Input() visible: boolean;
  @Input() photoID: number;
  @Output() successDeletePhoto = new EventEmitter();
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  isSubmitted = false;
  isRequest = false;

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
    this.measurementService.deletePhoto(this.measurement.id, this.photoID).subscribe((result) => {
      this.isRequest = false;
      this.visibleChange.emit(this.visible);
      this.successDeletePhoto.emit();
      this.close();
    }, (error) => {
      this.isRequest = false;
      if (error.status === 200) {
        this.visibleChange.emit(this.visible);
        this.successDeletePhoto.emit();
        this.close();
      } else {
        alert('Произошла ошибка');
      }
    });
  }

}
