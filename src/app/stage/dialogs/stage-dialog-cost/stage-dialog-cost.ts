import {Component, EventEmitter, Input,  OnInit, Output,  ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import {StageMountService} from '../../../services/stage-mount.service';

@Component({
  selector: 'app-dialog-stage-cost',
  templateUrl: './stage-dialog-cost.html',
  styleUrls: ['./stage-dialog-cost.css'],
})
export class StageDialogCostComponent implements OnInit {
  id;
  @Input() closable = true;
  @Input() stage;
  @Input() visible: boolean;
  @ViewChild('form') form: NgForm;
  @Output() successCost = new EventEmitter();
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  isSubmitted = false;
  isRequest = false;
  formData = {};

  constructor(private activatedRoute: ActivatedRoute,
              private stageService: StageMountService) {
  }


  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['stage_id'];
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
    console.log(this.form.form.value.sum);
    this.stageService.addCost(this.id, this.form.form.value.sum,
      this.form.form.value.comment)
      .subscribe((result) => {
        this.isRequest = false;
        this.visibleChange.emit(this.visible);
        this.successCost.emit(result);
        this.close();
      }, (error) => {
        alert('Произошла ошибка');
      });
  }

}


