import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import {MountService} from '../../../services/mount.service';
import {StageMountService} from '../../../services/stage-mount.service';

@Component({
  selector: 'app-stage-dialog-complete',
  templateUrl: './stage-dialog-complete.html',
  styleUrls: ['./stage-dialog-complete.css'],
})
export class StageDialogCompleteComponent implements OnInit {
  id;
  @Input() closable = true;
  @Input() stage;
  @Input() visible: boolean;
  @Output() successStageComplete = new EventEmitter();
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  isRequest = false;

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
    console.log('submit');
    this.stageService.completeStage(this.id)
      .subscribe((result) => {
        console.log('result');
        this.isRequest = false;
        this.visibleChange.emit(this.visible);
        this.successStageComplete.emit();
        this.close();
      }, (error) => {
        this.isRequest = false;
        if (error.status === 200) {
          console.log('error');
          this.visibleChange.emit(this.visible);
          this.successStageComplete.emit();
          this.close();
        } else {
          alert('Произошла ошибка');
        }
      });
  }

}
