import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import {MountService} from '../../../services/mount.service';

@Component({
  selector: 'app-mount-dialog-reject',
  templateUrl: './mount-dialog-reject.html',
  styleUrls: ['./mount-dialog-reject.css'],
})
export class MountDialogRejectComponent implements OnInit {
  id;
  @Input() closable = true;
  @Input() mount;
  @Input() visible: boolean;
  @ViewChild('form') form: NgForm;
  @Output() successMountReject = new EventEmitter();
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  causes = [1, 2];
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
    this.mountService.mountReject(this.id, Number(this.form.form.value.answer),
                                    this.form.form.value.comment)
      .subscribe((result) => {
        this.isRequest = false;
        this.visibleChange.emit(this.visible);
        this.successMountReject.emit();
        this.close();
      }, (error) => {
        this.isRequest = false;
        if (error.status === 200) {
          this.visibleChange.emit(this.visible);
          this.successMountReject.emit();
          this.close();
        } else {
          alert('Произошла ошибка');
        }
      });
  }

}
