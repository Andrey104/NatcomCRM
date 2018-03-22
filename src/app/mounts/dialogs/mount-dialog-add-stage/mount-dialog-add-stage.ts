import {Component, EventEmitter, Input,  OnInit, Output,  ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import {MountService} from '../../../services/mount.service';

@Component({
  selector: 'app-mount-dialog-add-stage',
  templateUrl: './mount-dialog-add-stage.html',
  styleUrls: ['./mount-dialog-add-stage.css'],
})

export class MountDialogAddStageComponent implements OnInit {
  id;
  @Input() closable = true;
  @Input() mount;
  @Input() visible: boolean;
  @ViewChild('form') form: NgForm;
  @Output() successMountStageAdd = new EventEmitter();
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  isSubmitted = false;
  isRequest = false;
  formData = {};

  constructor(private activatedRoute: ActivatedRoute,
              private mountService: MountService) {
  }


  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['mount_id'];
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
    this.mountService.mountStageAdd(this.id, this.form.form.value.calendar, this.form.form.value.comment)
      .subscribe((result) => {
        this.isRequest = false;
        this.visibleChange.emit(this.visible);
        this.successMountStageAdd.emit(result);
        this.close();
      }, (error) => {
        this.isRequest = false;
        if (error.status === 200) {
          console.log('error');
          this.visibleChange.emit(this.visible);
          this.successMountStageAdd.emit();
          this.close();
        } else {
          alert('Произошла ошибка');
        }
      });
  }
}


