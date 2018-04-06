import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import {MountService} from '../../../services/mount.service';
import {ComponentCost} from '../../../models/component-cost';


@Component({
  selector: 'app-dialog-component-cost-edit',
  templateUrl: './dialog-component-cost-edit.html',
  styleUrls: ['./dialog-component-cost-edit.css'],
})
export class DialogComponentCostComponent implements OnInit {
  id;
  @Input() closable = true;
  @Input() componentCost: ComponentCost;
  @Input() visible: boolean;
  @ViewChild('form') form: NgForm;
  @Output() successCost = new EventEmitter();
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  isSubmitted = false;
  isRequest = false;

  constructor(private activatedRoute: ActivatedRoute,
              private mountService: MountService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['mount_id'];
    });
  }

  submitForm() {
    this.isRequest = true;
    this.isSubmitted = true;
    const data = this.getFormValue();
    this.mountService.editComponentCost(this.id, this.componentCost.id, data)
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

  getFormValue(): Object {
    const sum = this.form.form.value.sum;
    let comment = this.form.form.value.comment;
    if (comment === '') {
      comment = null;
    }
    const data = {sum, comment};
    return data;
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
