import {Component, EventEmitter, Input,  OnInit, Output,  ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import {StageMountService} from '../../../services/stage-mount.service';

@Component({
  selector: 'app-stage-dialog-transfer',
  templateUrl: './stage-dialog-transfer.html',
  styleUrls: ['./stage-dialog-transfer.css'],
})

export class StageDialogTransferComponent implements OnInit {
  id;
  @Input() closable = true;
  @Input() stage;
  @Input() visible: boolean;
  @ViewChild('form') form: NgForm;
  @Output() successStageTransfer = new EventEmitter();
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  isSubmitted = false;
  isRequest = false;
  formData = {};
  causes = [1, 2];

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
    this.stageService.transferStage(this.id, this.form.form.value.calendar, this.form.form.value.comment, this.form.form.value.cause)
      .subscribe((result) => {
        this.isRequest = false;
        this.visibleChange.emit(this.visible);
        this.successStageTransfer.emit(result);
        this.close();
      }, (error) => {
        this.isRequest = false;
        if (error.status === 200) {
          console.log('error');
          this.visibleChange.emit(this.visible);
          this.successStageTransfer.emit();
          this.close();
        } else {
          alert('Произошла ошибка');
        }
      });
  }
}


