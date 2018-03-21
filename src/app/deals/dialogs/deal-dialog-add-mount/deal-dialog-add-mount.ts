import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DealService} from '../../../services/deal.service';
import {NgForm} from '@angular/forms';
import {MeasurementService} from '../../../services/measurement.service';

@Component({
  selector: 'app-dialog-add-mount',
  templateUrl: './deal-dialog-add-mount.html',
  styleUrls: ['./deal-dialog-add-mount.css'],
})

export class DealDialogMountComponent implements OnInit {
  id;
  @Input() closable = true;
  @Input() deal;
  @Input() visible: boolean;
  @ViewChild('form') form: NgForm;
  @Output() successDealMount = new EventEmitter();
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
    console.log(this.form.form.value.comment);
    this.dealService.newMount(this.id,
      this.form.form.value.calendar,
      this.form.form.value.comment)
      .subscribe((result) => {
        this.isRequest = false;
        this.visibleChange.emit(this.visible);
        this.successDealMount.emit(result);
        this.close();
      }, (error) => {
        this.isRequest = false;
        alert('Произошла ошибка');
        // });
      });
  }
}


