import {Component, EventEmitter, Input,  OnInit, Output,  ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import {MountService} from '../../../services/mount.service';

@Component({
  selector: 'app-mount-dialog-transfer',
  templateUrl: './mount-dialog-transfer.html',
  styleUrls: ['./mount-dialog-transfer.css'],
})

export class MountDialogTransferComponent implements OnInit {
  id;
  @Input() closable = true;
  @Input() mount;
  @Input() visible: boolean;
  @ViewChild('form') form: NgForm;
  @Output() successMountTransfer = new EventEmitter();
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  isSubmitted = false;
  isRequest = false;
  formData = {};
  causes = [1, 2];

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
    this.mountService.mountTransfer(this.id, this.form.form.value.calendar, this.form.form.value.comment, this.form.form.value.cause)
      .subscribe((result) => {
        this.isRequest = false;
        this.visibleChange.emit(this.visible);
        this.successMountTransfer.emit(result);
        this.close();
      }, (error) => {
        this.isRequest = false;
        if (error.status === 200) {
          this.visibleChange.emit(this.visible);
          this.successMountTransfer.emit();
          this.close();
        } else {
          alert('Произошла ошибка');
        }
      });
  }
}


