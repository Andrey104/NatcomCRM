import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import {MountService} from '../../../services/mount.service';

@Component({
  selector: 'app-mount-dialog-complete',
  templateUrl: './mount-dialog-complete.html',
  styleUrls: ['./mount-dialog-complete.css'],
})
export class MountDialogCompleteComponent implements OnInit {
  id;
  @Input() closable = true;
  @Input() mount;
  @Input() visible: boolean;
  @ViewChild('form') form: NgForm;
  @Output() successMountComplete = new EventEmitter();
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  isRequest = false;

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
    console.log('submit');
    this.mountService.mountComplete(this.id)
      .subscribe((result) => {
        console.log('result');
        this.isRequest = false;
        this.visibleChange.emit(this.visible);
        this.successMountComplete.emit();
        this.close();
      }, (error) => {
        this.isRequest = false;
        if (error.status === 200) {
          console.log('error');
          this.visibleChange.emit(this.visible);
          this.successMountComplete.emit();
          this.close();
        } else {
          alert('Произошла ошибка');
        }
      });
  }

}
