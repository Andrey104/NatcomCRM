import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';

import {Cost} from '../../../models/cost';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-dialog-cost-edit',
  templateUrl: './dialog-cost-edit.html',
  styleUrls: ['./dialog-cost-edit.css'],
})
export class DialogCostEditComponent {
  @Input() closable = true;
  @Input() cost: Cost;
  @Input() visible: boolean;
  @ViewChild('form') form: NgForm;
  @Output() successCost = new EventEmitter();
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  isSubmitted = false;
  isRequest = false;

  submitForm() {
    // this.isRequest = true;
    // this.isSubmitted = true;
    // this.mountService.addCost(this.mount.id, this.form.form.value.sum,
    //   this.form.form.value.comment, this.form.form.value.destination)
    //   .subscribe((result) => {
    //     this.isRequest = false;
    //     this.visibleChange.emit(this.visible);
    //     this.successCost.emit(result);
    //     this.close();
    //   }, (error) => {
    //     this.isRequest = false;
    //     alert('Произошла ошибка');
    //   });
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
