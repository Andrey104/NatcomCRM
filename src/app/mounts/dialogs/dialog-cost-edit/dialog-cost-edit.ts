import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

import {Cost} from '../../../models/cost';
import {NgForm} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {MountService} from '../../../services/mount.service';

@Component({
  selector: 'app-dialog-cost-edit',
  templateUrl: './dialog-cost-edit.html',
  styleUrls: ['./dialog-cost-edit.css'],
})
export class DialogCostEditComponent implements OnInit {
  @Input() closable = true;
  @Input() cost: Cost;
  @Input() visible: boolean;
  @ViewChild('form') form: NgForm;
  @Output() successCost = new EventEmitter();
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  id;
  isSubmitted = false;
  isRequest = false;

  constructor(private activatedRoute: ActivatedRoute,
              private mountService: MountService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['stage_id'];
    });
  }

  submitForm() {
    this.isRequest = true;
    this.isSubmitted = true;
    const data = this.getFormData();
    this.mountService.editCost(this.id, this.cost.id, data)
      .subscribe((result) => {
        this.isRequest = false;
        this.visibleChange.emit(this.visible);
        this.successCost.emit(result);
        this.close();
      }, (error) => {
        this.isRequest = false;
        alert('Произошла ошибка');
      });
  }

  getFormData(): Object {
    const sum = this.form.form.value.sum;
    let comment = this.form.form.value.comment;
    const destination = this.form.form.value.destination;
    if (comment === '') {
      comment = null;
    }
    const data = {destination, sum, comment};
    return data;
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
